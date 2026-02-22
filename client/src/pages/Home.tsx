import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Energetische Therapie & Healing
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Ontdek de kracht van energetische therapie en innerlijk werk voor persoonlijke ontwikkeling en heling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/1-op-1-sessies" className="btn-primary">
              Boek 1-op-1 Sessie
            </Link>
            <Link to="/workshops" className="btn-secondary">
              Schrijf in voor Workshop
            </Link>
            <Link to="/online-sessies" className="btn-secondary">
              Online Sessie
            </Link>
          </div>
        </div>
      </section>

      {/* Uitleg Sectie */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Wat is Energetische Therapie?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Energetische therapie is een holistische benadering die werkt met de energievelden van het lichaam. 
                Het helpt blokkades op te lossen, balans te herstellen en je natuurlijke helingsvermogen te activeren.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Door middel van verschillende technieken werk ik met je energie om dieperliggende patronen en 
                emotionele blokkades te transformeren, waardoor je meer rust, helderheid en levenskracht ervaart.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Innerlijk Werk & Persoonlijke Ontwikkeling
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Persoonlijke ontwikkeling begint bij zelfbewustzijn. In mijn praktijk combineer ik energetische 
                healing met innerlijk werk om je te begeleiden op je pad naar groei en transformatie.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Samen onderzoeken we wat je tegenhoudt, wat je voedt en hoe je meer in verbinding kunt komen 
                met jezelf en je levensdoel. Het is een reis naar binnen, naar je eigen kracht en wijsheid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Sectie */}
      <section className="bg-primary-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Neem contact op voor een afspraak of schrijf je in voor een van onze workshops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
              Neem Contact Op
            </Link>
            <Link to="/over-mij" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              Meer Over Mij
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


