# Energetische Therapie Praktijk Website

Een moderne website voor een energetische therapie praktijk waarmee bezoekers afspraken en workshopinschrijvingen kunnen aanvragen.

## Stack

- **Frontend**: React (Vite) + TypeScript + Tailwind CSS + React Router
- **Backend**: Node.js + Express
- **Email**: Nodemailer via SMTP

## Projectstructuur

```
.
├── client/          # React frontend (Vite)
├── server/          # Express backend
└── package.json     # Root package.json met scripts
```

## Installatie

### 1. Installeer alle dependencies

```bash
npm run install:all
```

Of handmatig:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Configureer de server environment variabelen

Kopieer `.env.example` naar `.env` in de `server/` map:

```bash
cd server
cp .env.example .env
```

Bewerk `server/.env` en vul je SMTP instellingen in (zie hieronder voor uitleg).

## SMTP Configuratie

### Gmail

1. Ga naar je Google Account instellingen
2. Schakel "2-Step Verification" in
3. Ga naar "App Passwords" en genereer een nieuw app password
4. Gebruik deze instellingen in `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=jouw-email@gmail.com
SMTP_PASS=jouw-app-password
```

### TransIP

```env
SMTP_HOST=smtp.transip.email
SMTP_PORT=465
SMTP_USER=jouw-email@jouwdomein.nl
SMTP_PASS=jouw-wachtwoord
```

**Let op**: Voor poort 465 moet je `secure: true` instellen in `server.js` (regel 30).

### SendGrid

1. Maak een account aan op SendGrid
2. Maak een SMTP API key aan
3. Gebruik deze instellingen:

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=jouw-sendgrid-api-key
```

## Environment Variabelen (server/.env)

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email instellingen
TO_EMAIL=your-email@gmail.com
FROM_EMAIL="Energetische Therapie Praktijk <no-reply@jouwdomein.nl>"
SEND_CUSTOMER_CONFIRMATION=false

# Server
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## Development

### Start beide servers tegelijk

```bash
npm run dev
```

### Start alleen de frontend

```bash
npm run dev:client
```

De frontend draait op: http://localhost:5173

### Start alleen de backend

```bash
npm run dev:server
```

De backend draait op: http://localhost:3001

## Productie Build

```bash
npm run build
```

Dit bouwt de frontend in de `client/dist/` map.

## API Endpoints

- `POST /api/appointment` - Voor 1-op-1 en online sessie aanvragen
- `POST /api/workshop-signup` - Voor workshop inschrijvingen
- `POST /api/contact` - Voor contactformulier berichten
- `GET /api/health` - Health check endpoint

## Features

- ✅ Responsive design (mobile-first)
- ✅ Formulier validatie met Zod + React Hook Form
- ✅ Email notificaties via SMTP
- ✅ Rate limiting (10 requests per 15 minuten per IP)
- ✅ Honeypot spam bescherming
- ✅ Toegankelijkheid (ARIA labels, keyboard navigation)
- ✅ Loading en success states

## Pagina's

1. **Home** - Hero sectie met CTA's en uitleg over energetische therapie
2. **1-op-1 Sessies** - Info en boekingsformulier
3. **Workshops** - Workshop cards met inschrijfformulieren
4. **Online Sessies** - Info en boekingsformulier
5. **Over Mij** - Informatie over de praktijk
6. **Contact** - Contactformulier en contactgegevens

## Aanpassen

### Workshops aanpassen

Bewerk `client/src/pages/Workshops.tsx` en pas de `workshops` array aan.

### Contactgegevens aanpassen

Bewerk `client/src/pages/Contact.tsx` en pas de contactgegevens aan.

### Styling aanpassen

Bewerk `client/tailwind.config.js` voor kleuren en `client/src/index.css` voor custom styles.

## Troubleshooting

### Email wordt niet verstuurd

1. Controleer je SMTP instellingen in `server/.env`
2. Voor Gmail: gebruik een App Password, niet je gewone wachtwoord
3. Controleer de server logs voor foutmeldingen
4. Test je SMTP instellingen met een email client eerst

### CORS errors

Zorg dat `FRONTEND_URL` in `server/.env` overeenkomt met waar je frontend draait.

### Port al in gebruik

Pas de poort aan in:
- Frontend: `client/vite.config.ts` (regel 6)
- Backend: `server/.env` (PORT variabele)

## Licentie

Privé project voor Energetische Therapie Praktijk.


