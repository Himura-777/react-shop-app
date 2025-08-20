import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopSales } from '../store/slices/topSalesSlice.js'
import Loader from './Loader.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import ProductCard from './ProductCard.jsx'

export default function TopSales(){
  const { items, status, error } = useSelector(s => s.topSales)
  const dispatch = useDispatch()

  useEffect(()=>{ if (status==='idle') dispatch(fetchTopSales()) }, [status, dispatch])

  if (status==='loading') return <Loader />
  if (status==='failed') return <ErrorMessage message={error} onRetry={()=>dispatch(fetchTopSales())} />
  if (!items.length) return null

  return (
    <section>
      <h3>Хиты продаж</h3>
      <div className="grid">
        {items.map(x => <ProductCard key={x.id} item={x} />)}
      </div>
    </section>
  )
}
