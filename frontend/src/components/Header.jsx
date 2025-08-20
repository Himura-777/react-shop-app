import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggle, setText } from '../store/slices/searchSlice.js'

export default function Header(){
  const count = useSelector(s => s.cart.items.length)
  const searchOpen = useSelector(s => s.search.open)
  const text = useSelector(s => s.search.text)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearchClick = () => {
    if (!searchOpen) {
      dispatch(toggle())
      return
    }
    if (text.trim()) {
      if (location.pathname !== '/catalog.html') navigate('/catalog.html')
    } else {
      dispatch(toggle()) // collapse if empty
    }
  }

  return (
    <header>
      <div className="container brand">
        <Link to="/" className="logo" style={{display:'flex',alignItems:'center',gap:8}}>
          <img alt="logo" src="/logo.svg" width="28" height="28" />
          <strong>Bosa Noga</strong>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/catalog.html">Каталог</NavLink>
          <NavLink to="/about.html">О магазине</NavLink>
          <NavLink to="/contacts.html">Контакты</NavLink>
        </nav>
        <div className="tools">
          <button aria-label="Поиск" onClick={handleSearchClick}>🔍</button>
          <NavLink to="/cart.html" aria-label="Корзина">🛒{count>0 && <span className="badge">{count}</span>}</NavLink>
        </div>
      </div>
    </header>
  )
}
