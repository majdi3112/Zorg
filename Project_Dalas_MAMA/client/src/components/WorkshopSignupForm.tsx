import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const workshopSignupSchema = z.object({
  voornaam: z.string().min(1, 'Voornaam is verplicht'),
  achternaam: z.string().min(1, 'Achternaam is verplicht'),
  email: z.string().email('Ongeldig email adres'),
  telefoon: z.string().optional(),
  workshopNaam: z.string(),
  workshopDatum: z.string(),
  bericht: z.string().optional(),
  honeypot: z.string().optional(),
})

type WorkshopSignupFormData = z.infer<typeof workshopSignupSchema>

interface WorkshopSignupFormProps {
  workshopNaam: string
  workshopDatum: string
  pagina: string
}

export default function WorkshopSignupForm({ workshopNaam, workshopDatum, pagina }: WorkshopSignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkshopSignupFormData>({
    resolver: zodResolver(workshopSignupSchema),
    defaultValues: {
      workshopNaam,
      workshopDatum,
    },
  })

  const onSubmit = async (data: WorkshopSignupFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('http://localhost:3001/api/workshop-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          pagina,
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

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-lg font-medium mb-2">
          ✓ Bedankt, je inschrijving is verstuurd!
        </div>
        <p className="text-green-700">
          Ik neem zo spoedig mogelijk contact met je op om je inschrijving te bevestigen.
        </p>
      </div>
    )
  }

  return (
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

      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
        <p className="text-primary-800">
          <strong>Workshop:</strong> {workshopNaam}
        </p>
        <p className="text-primary-800">
          <strong>Datum:</strong> {new Date(workshopDatum).toLocaleDateString('nl-NL', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

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
          Bericht (optioneel)
        </label>
        <textarea
          id="bericht"
          {...register('bericht')}
          rows={4}
          className="input-field"
          placeholder="Heb je vragen of wil je iets specifieks kwijt?"
        />
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
        {isSubmitting ? 'Versturen...' : 'Schrijf je in'}
      </button>
    </form>
  )
}

