import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct, reset } from '../store/slices/productSlice.js'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { addToCart } from '../store/slices/cartSlice.js'

export default function ProductPage(){
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { item, status, error } = useSelector(s => s.product)
  const [size, setSize] = useState(null)
  const [count, setCount] = useState(1)

  useEffect(()=>{ dispatch(fetchProduct(id)); return ()=>dispatch(reset()) }, [id, dispatch])

  if (status==='loading') return <Loader />
  if (status==='failed') return <ErrorMessage message={error} onRetry={()=>dispatch(fetchProduct(id))} />
  if (!item) return null

  const availableSizes = item.sizes?.filter(s => s.available) || []

  const handleAdd = () => {
    dispatch(addToCart({ id: item.id, title: item.title, size, price: item.price, count }))
    navigate('/cart.html')
  }

  return (
    <div className="row">
      <div className="col" style={{maxWidth:500}}>
        <img src={item.images?.[0]} alt={item.title} style={{width:'100%',borderRadius:12}}/>
      </div>
      <div className="col">
        <h2>{item.title}</h2>
        <table className="table">
          <tbody>
            <tr><th>Артикул</th><td>{item.sku || ''}</td></tr>
            <tr><th>Производитель</th><td>{item.manufacturer || ''}</td></tr>
            <tr><th>Цвет</th><td>{item.color || ''}</td></tr>
            <tr><th>Материалы</th><td>{item.material || ''}</td></tr>
            <tr><th>Сезон</th><td>{item.season || ''}</td></tr>
            <tr><th>Повод</th><td>{item.reason || ''}</td></tr>
          </tbody>
        </table>
        <div className="price" style={{marginTop:8}}>{new Intl.NumberFormat('ru-RU').format(item.price)} ₽</div>
        <div style={{marginTop:8}}>
          <div className="sizes">
            {availableSizes.map(s => (
              <button key={s.size} className={'size' + (size===s.size ? ' active' : '')} onClick={()=>setSize(s.size)}>{s.size}</button>
            ))}
          </div>
          {availableSizes.length>0 && (
            <div className="qty" style={{marginTop:8}}>
              <span>Количество:</span>
              <button onClick={()=>setCount(c=>Math.max(1,c-1))}>−</button>
              <b>{count}</b>
              <button onClick={()=>setCount(c=>Math.min(10,c+1))}>+</button>
            </div>
          )}
          {availableSizes.length>0 && (
            <button className="primary" disabled={!size} onClick={handleAdd} style={{marginTop:12}}>В корзину</button>
          )}
        </div>
      </div>
    </div>
  )
}
