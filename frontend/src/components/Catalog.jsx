import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCatalog, reset, setQ } from '../store/slices/catalogSlice.js'
import { close } from '../store/slices/searchSlice.js'
import Categories from './Categories.jsx'
import ProductCard from './ProductCard.jsx'
import Loader from './Loader.jsx'
import ErrorMessage from './ErrorMessage.jsx'

export default function Catalog({ showSearch }){
  const dispatch = useDispatch()
  const { items, status, error, hasMore, q } = useSelector(s => s.catalog)
  const activeId = useSelector(s => s.categories.activeId)
  const searchText = useSelector(s => s.search.text)

  useEffect(()=>{
    dispatch(setQ(showSearch ? searchText : ''))
    dispatch(reset())
    dispatch(fetchCatalog({ categoryId: activeId, q: showSearch ? searchText : '' }))
    return ()=>dispatch(reset())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, showSearch, searchText, dispatch])

  const loadMore = () => {
    dispatch(fetchCatalog({ categoryId: activeId, offset: items.length, q }))
  }

  return (
    <section>
      <Categories onChange={()=>{}}/>
      {showSearch && (
        <form className="searchbar" onSubmit={(e)=>{e.preventDefault(); dispatch(setQ(searchText)); dispatch(reset()); dispatch(fetchCatalog({ categoryId: activeId, q: searchText }))}}>
          <input placeholder="Поиск" defaultValue={searchText} readOnly />
          <button className="primary" type="submit">Искать</button>
        </form>
      )}
      {status==='loading' && items.length===0 && <Loader />}
      {status==='failed' && items.length===0 && <ErrorMessage message={error} onRetry={()=>dispatch(fetchCatalog({ categoryId: activeId, q }))} />}
      <div className="grid" style={{marginTop:16}}>
        {items.map(it => <ProductCard key={it.id} item={it} />)}
      </div>
      {status==='loading' && items.length>0 && <Loader small />}
      {hasMore && status!=='loading' && (
        <div style={{textAlign:'center', marginTop:16}}>
          <button onClick={loadMore}>Загрузить ещё</button>
        </div>
      )}
    </section>
  )
}
