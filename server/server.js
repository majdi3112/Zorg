import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import { z } from 'zod';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rate limiting: 10 requests per 15 minuten per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuten
  max: 10,
  message: 'Te veel aanvragen. Probeer het over een paar minuten opnieuw.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Nodemailer transporter setup
const smtpPort = parseInt(process.env.SMTP_PORT || '587');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465, // true voor 465, false voor andere poorten
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verificatie van SMTP configuratie
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP configuratie fout:', error);
  } else {
    console.log('SMTP server is klaar om emails te versturen');
  }
});

// Validation schemas
const appointmentSchema = z.object({
  voornaam: z.string().min(1, 'Voornaam is verplicht'),
  achternaam: z.string().min(1, 'Achternaam is verplicht'),
  email: z.string().email('Ongeldig email adres'),
  telefoon: z.string().optional(),
  type: z.string(),
  gewensteDatum: z.string().min(1, 'Gewenste datum is verplicht'),
  gewensteTijd: z.string().min(1, 'Gewenste tijd is verplicht'),
  onlineOfFysiek: z.string().min(1, 'Selecteer online of fysiek'),
  bericht: z.string().optional(),
  honeypot: z.string().optional(), // Honeypot field
  pagina: z.string().optional(),
});

const workshopSignupSchema = z.object({
  voornaam: z.string().min(1, 'Voornaam is verplicht'),
  achternaam: z.string().min(1, 'Achternaam is verplicht'),
  email: z.string().email('Ongeldig email adres'),
  telefoon: z.string().optional(),
  workshopNaam: z.string().min(1, 'Workshop naam is verplicht'),
  workshopDatum: z.string().min(1, 'Workshop datum is verplicht'),
  bericht: z.string().optional(),
  honeypot: z.string().optional(),
  pagina: z.string().optional(),
});

const contactSchema = z.object({
  voornaam: z.string().min(1, 'Voornaam is verplicht'),
  achternaam: z.string().min(1, 'Achternaam is verplicht'),
  email: z.string().email('Ongeldig email adres'),
  telefoon: z.string().optional(),
  bericht: z.string().min(1, 'Bericht is verplicht'),
  honeypot: z.string().optional(),
  pagina: z.string().optional(),
});

// Helper functie om email body te maken
function createEmailBody(data, type) {
  let body = `Nieuwe ${type} aanvraag\n\n`;
  body += `Van: ${data.voornaam} ${data.achternaam}\n`;
  body += `Email: ${data.email}\n`;
  if (data.telefoon) body += `Telefoon: ${data.telefoon}\n`;
  body += `\n`;
  
  if (type === 'appointment') {
    body += `Type: ${data.type}\n`;
    body += `Gewenste datum: ${data.gewensteDatum}\n`;
    body += `Gewenste tijd: ${data.gewensteTijd}\n`;
    body += `Online of fysiek: ${data.onlineOfFysiek}\n`;
  } else if (type === 'workshop') {
    body += `Workshop: ${data.workshopNaam}\n`;
    body += `Workshop datum: ${data.workshopDatum}\n`;
  }
  
  if (data.bericht) {
    body += `\nBericht:\n${data.bericht}\n`;
  }
  
  if (data.pagina) {
    body += `\nAanvraag afkomstig van: ${data.pagina}\n`;
  }
  
  return body;
}

// POST /api/appointment
app.post('/api/appointment', async (req, res) => {
  try {
    // Honeypot check
    if (req.body.honeypot && req.body.honeypot !== '') {
      return res.status(200).json({ success: true }); // Fake success voor bots
    }

    const data = appointmentSchema.parse(req.body);

    const subject = `Nieuwe aanvraag: ${data.type} – ${data.gewensteDatum} ${data.gewensteTijd}`;
    const body = createEmailBody(data, 'appointment');

    // Email naar praktijk
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: subject,
      text: body,
    });

    // Optionele bevestigingsmail naar klant
    if (process.env.SEND_CUSTOMER_CONFIRMATION === 'true') {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: data.email,
        subject: 'Bevestiging van je aanvraag',
        text: `Beste ${data.voornaam},\n\nBedankt voor je aanvraag voor een ${data.type} op ${data.gewensteDatum} om ${data.gewensteTijd}.\n\nIk neem zo spoedig mogelijk contact met je op.\n\nMet vriendelijke groet,\nEnergetische Therapie Praktijk`,
      });
    }

    res.json({ success: true, message: 'Aanvraag succesvol verstuurd' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validatiefout', 
        errors: error.errors 
      });
    }
    console.error('Fout bij versturen email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Er is een fout opgetreden bij het versturen van je aanvraag' 
    });
  }
});

// POST /api/workshop-signup
app.post('/api/workshop-signup', async (req, res) => {
  try {
    // Honeypot check
    if (req.body.honeypot && req.body.honeypot !== '') {
      return res.status(200).json({ success: true });
    }

    const data = workshopSignupSchema.parse(req.body);

    const subject = `Nieuwe workshop inschrijving: ${data.workshopNaam} – ${data.workshopDatum}`;
    const body = createEmailBody(data, 'workshop');

    // Email naar praktijk
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: subject,
      text: body,
    });

    // Optionele bevestigingsmail naar klant
    if (process.env.SEND_CUSTOMER_CONFIRMATION === 'true') {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: data.email,
        subject: 'Bevestiging workshop inschrijving',
        text: `Beste ${data.voornaam},\n\nBedankt voor je inschrijving voor de workshop "${data.workshopNaam}" op ${data.workshopDatum}.\n\nIk neem zo spoedig mogelijk contact met je op.\n\nMet vriendelijke groet,\nEnergetische Therapie Praktijk`,
      });
    }

    res.json({ success: true, message: 'Inschrijving succesvol verstuurd' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validatiefout', 
        errors: error.errors 
      });
    }
    console.error('Fout bij versturen email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Er is een fout opgetreden bij het versturen van je inschrijving' 
    });
  }
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    // Honeypot check
    if (req.body.honeypot && req.body.honeypot !== '') {
      return res.status(200).json({ success: true });
    }

    const data = contactSchema.parse(req.body);

    const subject = `Nieuw contactformulier bericht van ${data.voornaam} ${data.achternaam}`;
    const body = createEmailBody(data, 'contact');

    // Email naar praktijk
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: subject,
      text: body,
    });

    // Optionele bevestigingsmail naar klant
    if (process.env.SEND_CUSTOMER_CONFIRMATION === 'true') {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: data.email,
        subject: 'Bevestiging contactformulier',
        text: `Beste ${data.voornaam},\n\nBedankt voor je bericht. Ik neem zo spoedig mogelijk contact met je op.\n\nMet vriendelijke groet,\nEnergetische Therapie Praktijk`,
      });
    }

    res.json({ success: true, message: 'Bericht succesvol verstuurd' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validatiefout', 
        errors: error.errors 
      });
    }
    console.error('Fout bij versturen email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Er is een fout opgetreden bij het versturen van je bericht' 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});

