import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import EenOpEenSessies from './pages/EenOpEenSessies'
import Workshops from './pages/Workshops'
import OnlineSessies from './pages/OnlineSessies'
import OverMij from './pages/OverMij'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/1-op-1-sessies" element={<EenOpEenSessies />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/online-sessies" element={<OnlineSessies />} />
          <Route path="/over-mij" element={<OverMij />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

