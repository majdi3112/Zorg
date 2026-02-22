import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const contactSchema = z.object({
  voornaam: z.string().min(1, 'Voornaam is verplicht'),
  achternaam: z.string().min(1, 'Achternaam is verplicht'),
  email: z.string().email('Ongeldig email adres'),
  telefoon: z.string().optional(),
  bericht: z.string().min(1, 'Bericht is verplicht'),
  honeypot: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          pagina: 'Contact',
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Er is een fout opgetreden')
      }

      setSubmitSuccess(true)
      reset()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Er is een fout opgetreden')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Heb je vragen of wil je meer informatie? Neem gerust contact met me op.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contactgegevens
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium">Email</p>
                <p>info@energetischetherapie.nl</p>
              </div>
              <div>
                <p className="font-medium">Telefoon</p>
                <p>+31 (0)6 12345678</p>
              </div>
              <div>
                <p className="font-medium">Adres</p>
                <p>
                  Praktijkruimte<br />
                  Straatnaam 123<br />
                  1234 AB Plaatsnaam
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Openingstijden
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>Maandag - Vrijdag: 9:00 - 18:00</p>
                <p>Zaterdag: 10:00 - 16:00</p>
                <p>Zondag: Gesloten</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Stuur een Bericht
            </h2>

            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 text-lg font-medium mb-2">
                  ✓ Bedankt, je bericht is verstuurd!
                </div>
                <p className="text-green-700 mb-4">
                  Ik neem zo spoedig mogelijk contact met je op.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="text-green-600 hover:text-green-700 underline"
                >
                  Nieuw bericht versturen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field */}
                <input
                  type="text"
                  {...register('honeypot')}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="voornaam" className="label-field">
                      Voornaam *
                    </label>
                    <input
                      id="voornaam"
                      type="text"
                      {...register('voornaam')}
                      className="input-field"
                      aria-invalid={errors.voornaam ? 'true' : 'false'}
                    />
                    {errors.voornaam && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.voornaam.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="achternaam" className="label-field">
                      Achternaam *
                    </label>
                    <input
                      id="achternaam"
                      type="text"
                      {...register('achternaam')}
                      className="input-field"
                      aria-invalid={errors.achternaam ? 'true' : 'false'}
                    />
                    {errors.achternaam && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.achternaam.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="label-field">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="input-field"
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="telefoon" className="label-field">
                      Telefoon
                    </label>
                    <input
                      id="telefoon"
                      type="tel"
                      {...register('telefoon')}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bericht" className="label-field">
                    Bericht *
                  </label>
                  <textarea
                    id="bericht"
                    {...register('bericht')}
                    rows={6}
                    className="input-field"
                    aria-invalid={errors.bericht ? 'true' : 'false'}
                  />
                  {errors.bericht && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.bericht.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600" role="alert">
                      {submitError}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Versturen...' : 'Verstuur Bericht'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


