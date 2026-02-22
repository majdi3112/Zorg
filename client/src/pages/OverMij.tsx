import { Link } from 'react-router-dom'

export default function OverMij() {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Over Mij
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Welkom bij mijn praktijk voor energetische therapie en healing. Mijn naam is [NAAM] 
              en ik ben gepassioneerd over het begeleiden van mensen op hun pad naar heling, 
              groei en persoonlijke ontwikkeling.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Mijn Reis
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mijn eigen reis naar energetische healing begon jaren geleden, toen ik zelf 
                op zoek was naar antwoorden en heling. Door verschillende vormen van therapie 
                en innerlijk werk ontdekte ik de kracht van energetische healing en hoe het 
                diepgaande transformatie kan brengen.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Deze ervaring heeft me geïnspireerd om anderen te begeleiden op hun eigen pad. 
                Ik heb verschillende opleidingen en trainingen gevolgd in energetische therapie, 
                healing technieken en innerlijk werk, en blijf me continu ontwikkelen.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Mijn Aanpak
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ik geloof dat iedereen zijn eigen unieke pad heeft en dat heling van binnenuit komt. 
                Mijn aanpak is holistisch en intuïtief - ik werk met wat er op dat moment speelt 
                en wat jij nodig hebt.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                In mijn praktijk combineer ik verschillende technieken:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Energetische healing en chakra werk</li>
                <li>Emotionele verwerking en heling</li>
                <li>Innerlijk werk en zelfreflectie</li>
                <li>Persoonlijke ontwikkeling en groei</li>
                <li>Intuïtieve begeleiding</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Ik creëer een veilige en ondersteunende ruimte waar je jezelf kunt zijn en 
                kunt werken aan wat je tegenhoudt of wat je wilt ontwikkelen.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Wat Ik Je Kan Bieden
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Of je nu kampt met specifieke uitdagingen, op zoek bent naar persoonlijke groei, 
                of gewoon meer rust en balans in je leven wilt - ik ben er om je te begeleiden.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Samen kunnen we werken aan het oplossen van blokkades, het verwerken van emoties, 
                het vinden van meer balans en het ontdekken van je eigen kracht en wijsheid. 
                Het is een reis naar binnen, naar jezelf.
              </p>
            </section>

            <section className="bg-primary-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Laten We Kennismaken
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Ben je nieuwsgierig geworden? Neem gerust contact met me op voor een kennismaking 
                of boek een sessie. Ik kijk ernaar uit om je te ontmoeten en je te begeleiden 
                op je pad naar heling en groei.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary text-center">
                  Neem Contact Op
                </Link>
                <Link to="/1-op-1-sessies" className="btn-secondary text-center">
                  Boek een Sessie
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

