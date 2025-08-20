import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../store/slices/cartSlice.js'
import { submitOrder, reset as resetOrder } from '../store/slices/orderSlice.js'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function CartPage(){
  const { items } = useSelector(s => s.cart)
  const order = useSelector(s => s.order)
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const total = items.reduce((sum, it) => sum + it.price * it.count, 0)

  useEffect(()=>()=>{dispatch(resetOrder())}, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      owner: { phone, address },
      items: items.map(it => ({ id: it.id, price: it.price, count: it.count }))
    }
    dispatch(submitOrder(payload))
  }

  if (order.status === 'loading') return <Loader />
  if (order.status === 'failed') return <ErrorMessage message={order.error} onRetry={handleSubmit} />

  return (
    <div>
      <h2>Корзина</h2>
      {items.length === 0 ? (
        <p>В корзине пусто</p>
      ) : (
        <table className="table">
          <thead>
            <tr><th>#</th><th>Название</th><th>Размер</th><th>Кол-во</th><th>Стоимость</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((it, idx)=>(
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{it.title}</td>
                <td>{it.size}</td>
                <td>{it.count}</td>
                <td>{new Intl.NumberFormat('ru-RU').format(it.price*it.count)} ₽</td>
                <td><button onClick={()=>dispatch(removeFromCart({ index: idx }))}>Удалить</button></td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" style={{textAlign:'right'}}><b>Итого</b></td>
              <td><b>{new Intl.NumberFormat('ru-RU').format(total)} ₽</b></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}

      {items.length>0 && (
        <form onSubmit={handleSubmit} style={{marginTop:16, display:'grid', gap:8, maxWidth:480}}>
          <input placeholder="Телефон" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
          <input placeholder="Адрес доставки" value={address} onChange={(e)=>setAddress(e.target.value)} required />
          <button className="primary" type="submit">Оформить заказ</button>
        </form>
      )}

      {order.success && <div className="loader">Заказ успешно оформлен!</div>}
    </div>
  )
}
