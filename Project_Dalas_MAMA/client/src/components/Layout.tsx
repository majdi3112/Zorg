import { Link, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary-700">
              Energetische Therapie
            </Link>
            <ul className="hidden md:flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className={`hover:text-primary-600 transition-colors ${isActive('/') ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/1-op-1-sessies" 
                  className={`hover:text-primary-600 transition-colors ${isActive('/1-op-1-sessies') ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
                >
                  1-op-1 Sessies
                </Link>
              </li>
              <li>
                <Link 
                  to="/workshops" 
                  className={`hover:text-primary-600 transition-colors ${isActive('/workshops') ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link 
                  to="/online-sessies" 
                  className={`hover:text-primary-600 transition-colors ${isActive('/online-sessies') ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
                >
                  Online Sessies
                </Link>
              </li>
              <li>
                <Link 
                  to="/over-mij" 
                  className={`hover:text-primary-600 transition-colors ${isActive('/over-mij') ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
                >
                  Over Mij
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`hover:text-primary-600 transition-colors ${isActive('/contact') ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <button className="md:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Energetische Therapie Praktijk. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

