import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import About from './pages/About.jsx'
import Contacts from './pages/Contacts.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import NotFound from './pages/NotFound.jsx'
import SearchOverlay from './components/SearchOverlay.jsx'

export default function App() {
  return (
    <div className="layout">
      <Header />
      <SearchOverlay />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog.html" element={<CatalogPage />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/contacts.html" element={<Contacts />} />
          <Route path="/catalog/:id.html" element={<ProductPage />} />
          <Route path="/cart.html" element={<CartPage />} />
          <Route path="/404.html" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404.html" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
