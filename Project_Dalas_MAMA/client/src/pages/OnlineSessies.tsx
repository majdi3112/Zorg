import AppointmentForm from '../components/AppointmentForm'

export default function OnlineSessies() {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Online Sessies
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Energetische therapie en healing vanuit het comfort van je eigen huis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Voordelen van Online Sessies
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Flexibel en vanuit je eigen omgeving</li>
              <li>Geen reistijd nodig</li>
              <li>Net zo effectief als fysieke sessies</li>
              <li>Privacy en comfort van thuis</li>
              <li>Werkt wereldwijd, waar je ook bent</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Energetische therapie werkt op afstand net zo krachtig als in persoon. 
              Energie kent geen afstand en kan overal naartoe worden gestuurd waar nodig.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Wat heb je nodig?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Een rustige ruimte waar je niet gestoord wordt</li>
              <li>Een goede internetverbinding voor videobellen</li>
              <li>Comfortabele kleding waarin je kunt ontspannen</li>
              <li>Eventueel een koptelefoon voor betere geluidskwaliteit</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We kunnen werken via videocall of puur energetisch op afstand, 
              afhankelijk van wat het beste bij jou past.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Boek je Online Sessie
          </h2>
          <AppointmentForm type="Online Sessie" pagina="Online Sessies" />
        </div>
      </div>
    </div>
  )
}

