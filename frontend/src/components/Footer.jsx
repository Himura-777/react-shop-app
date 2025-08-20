import { NavLink } from 'react-router-dom'

export default function Footer(){
  return (
    <footer>
      <div className="container" style={{padding:'16px 0', display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap'}}>
        <div>&copy; {new Date().getFullYear()} Bosa Noga</div>
        <nav className="nav">
          <NavLink to="/about.html">О магазине</NavLink>
          <NavLink to="/catalog.html">Каталог</NavLink>
          <NavLink to="/contacts.html">Контакты</NavLink>
        </nav>
      </div>
    </footer>
  )
}
