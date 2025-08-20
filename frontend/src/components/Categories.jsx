import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, setActive } from '../store/slices/categoriesSlice.js'
import Loader from './Loader.jsx'
import ErrorMessage from './ErrorMessage.jsx'

export default function Categories({ onChange }){
  const { items, status, error, activeId } = useSelector(s => s.categories)
  const dispatch = useDispatch()

  useEffect(()=>{ if (status==='idle') dispatch(fetchCategories()) }, [status, dispatch])

  if (status==='loading') return <Loader small />
  if (status==='failed') return <ErrorMessage message={error} onRetry={()=>dispatch(fetchCategories())} />

  return (
    <div className="tabs">
      {items.map(c => (
        <button key={c.id} className={'tab' + (c.id===activeId ? ' active' : '')}
          onClick={()=>{dispatch(setActive(c.id)); onChange && onChange(c.id)}}>{c.title}</button>
      ))}
    </div>
  )
}
