import { useState } from 'react'
import WorkshopSignupForm from '../components/WorkshopSignupForm'

interface Workshop {
  id: string
  titel: string
  datum: string
  tijd: string
  locatie: string
  prijs: string
  beschrijving: string
}

const workshops: Workshop[] = [
  {
    id: '1',
    titel: 'Introductie tot Energetische Healing',
    datum: '2024-03-15',
    tijd: '10:00 - 13:00',
    locatie: 'Online',
    prijs: '€75',
    beschrijving: 'Een kennismaking met energetische healing. Leer de basisprincipes en ervaar zelf hoe energie werkt.',
  },
  {
    id: '2',
    titel: 'Chakra Balans Workshop',
    datum: '2024-04-10',
    tijd: '14:00 - 17:00',
    locatie: 'Fysiek - Praktijkruimte',
    prijs: '€95',
    beschrijving: 'Diepgaande workshop over de chakra\'s. Leer je energiecentra kennen en balanceren voor meer harmonie in je leven.',
  },
  {
    id: '3',
    titel: 'Innerlijk Werk & Zelfreflectie',
    datum: '2024-05-05',
    tijd: '10:00 - 16:00',
    locatie: 'Online',
    prijs: '€120',
    beschrijving: 'Een dag vol innerlijk werk, zelfreflectie en persoonlijke ontwikkeling. Ontdek wat je tegenhoudt en hoe je kunt groeien.',
  },
  {
    id: '4',
    titel: 'Emotionele Heling & Verwerking',
    datum: '2024-06-12',
    tijd: '13:00 - 17:00',
    locatie: 'Fysiek - Praktijkruimte',
    prijs: '€100',
    beschrijving: 'Workshop gericht op emotionele heling. Leer technieken om oude pijn en emoties te verwerken en los te laten.',
  },
]

export default function Workshops() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Workshops
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Leer en groei samen met anderen in een veilige en ondersteunende omgeving.
          </p>
        </div>

        {!selectedWorkshop ? (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {workshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {workshop.titel}
                    </h2>
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {workshop.prijs}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4 text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(workshop.datum).toLocaleDateString('nl-NL', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {workshop.tijd}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {workshop.locatie}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {workshop.beschrijving}
                  </p>

                  <button
                    onClick={() => setSelectedWorkshop(workshop)}
                    className="btn-primary w-full"
                  >
                    Schrijf je in
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedWorkshop(null)}
              className="text-primary-600 hover:text-primary-700 mb-6 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar workshops
            </button>

            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedWorkshop.titel}
              </h2>
              <div className="text-gray-600 mb-6 space-y-1">
                <p>
                  <strong>Datum:</strong> {new Date(selectedWorkshop.datum).toLocaleDateString('nl-NL', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p><strong>Tijd:</strong> {selectedWorkshop.tijd}</p>
                <p><strong>Locatie:</strong> {selectedWorkshop.locatie}</p>
                <p><strong>Prijs:</strong> {selectedWorkshop.prijs}</p>
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {selectedWorkshop.beschrijving}
              </p>

              <WorkshopSignupForm
                workshopNaam={selectedWorkshop.titel}
                workshopDatum={selectedWorkshop.datum}
                pagina="Workshops"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

