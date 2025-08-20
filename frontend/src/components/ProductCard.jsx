import { Link } from 'react-router-dom'

export default function ProductCard({ item }){
  const price = new Intl.NumberFormat('ru-RU').format(item.price)
  const old = item.oldPrice && item.oldPrice > item.price ? (
    <span className="muted" style={{textDecoration:'line-through'}}> {new Intl.NumberFormat('ru-RU').format(item.oldPrice)} ₽</span>
  ) : null
  return (
    <div className="card">
      <img src={item.images?.[0]} alt={item.title} loading="lazy" />
      <div className="card-body">
        <div style={{minHeight:48}}>{item.title}</div>
        <div className="price">{price} ₽ {old}</div>
        <Link to={`/catalog/${item.id}.html`}><button className="primary">Заказать</button></Link>
      </div>
    </div>
  )
}
