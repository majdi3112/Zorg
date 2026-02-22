import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

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
  honeypot: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

interface AppointmentFormProps {
  type: string
  pagina: string
  onSubmitSuccess?: () => void
}

export default function AppointmentForm({ type, pagina, onSubmitSuccess }: AppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      type,
    },
  })

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('http://localhost:3001/api/appointment', {
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
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }
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
          ✓ Bedankt, je aanvraag is verstuurd!
        </div>
        <p className="text-green-700">
          Ik neem zo spoedig mogelijk contact met je op.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="mt-4 text-green-600 hover:text-green-700 underline"
        >
          Nieuw formulier
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field - verborgen voor gebruikers */}
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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="gewensteDatum" className="label-field">
            Gewenste datum *
          </label>
          <input
            id="gewensteDatum"
            type="date"
            {...register('gewensteDatum')}
            className="input-field"
            aria-invalid={errors.gewensteDatum ? 'true' : 'false'}
          />
          {errors.gewensteDatum && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.gewensteDatum.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="gewensteTijd" className="label-field">
            Gewenste tijd *
          </label>
          <input
            id="gewensteTijd"
            type="time"
            {...register('gewensteTijd')}
            className="input-field"
            aria-invalid={errors.gewensteTijd ? 'true' : 'false'}
          />
          {errors.gewensteTijd && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.gewensteTijd.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="onlineOfFysiek" className="label-field">
          Online of fysiek *
        </label>
        <select
          id="onlineOfFysiek"
          {...register('onlineOfFysiek')}
          className="input-field"
          aria-invalid={errors.onlineOfFysiek ? 'true' : 'false'}
        >
          <option value="">Selecteer...</option>
          <option value="Online">Online</option>
          <option value="Fysiek">Fysiek</option>
        </select>
        {errors.onlineOfFysiek && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.onlineOfFysiek.message}
          </p>
        )}
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
        {isSubmitting ? 'Versturen...' : 'Verstuur Aanvraag'}
      </button>
    </form>
  )
}


