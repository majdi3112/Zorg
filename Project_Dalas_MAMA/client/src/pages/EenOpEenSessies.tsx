import AppointmentForm from '../components/AppointmentForm'

export default function EenOpEenSessies() {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            1-op-1 Sessies
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Persoonlijke begeleiding op maat voor jouw unieke pad naar heling en groei.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Wat kun je verwachten?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In een 1-op-1 sessie werk ik persoonlijk met jou aan je specifieke vragen en uitdagingen. 
              Elke sessie is uniek en wordt afgestemd op wat jij op dat moment nodig hebt.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We kunnen werken aan:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Energetische blokkades oplossen</li>
              <li>Emotionele heling en verwerking</li>
              <li>Persoonlijke ontwikkeling en groei</li>
              <li>Innerlijk werk en zelfreflectie</li>
              <li>Balans en rust vinden</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Een sessie duurt ongeveer 60-90 minuten en kan zowel online als fysiek plaatsvinden.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hoe werkt het?
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-3">
              <li>
                <strong>Vul het formulier in</strong> met je voorkeuren voor datum en tijd
              </li>
              <li>
                <strong>Ik neem contact met je op</strong> om de afspraak te bevestigen
              </li>
              <li>
                <strong>Tijdens de sessie</strong> werken we samen aan wat jij nodig hebt
              </li>
              <li>
                <strong>Na de sessie</strong> kun je de effecten ervaren en integratie vindt plaats
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Boek je 1-op-1 Sessie
          </h2>
          <AppointmentForm type="1-op-1 Sessie" pagina="1-op-1 Sessies" />
        </div>
      </div>
    </div>
  )
}

