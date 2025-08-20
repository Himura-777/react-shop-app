import { useDispatch, useSelector } from 'react-redux'
import { setText } from '../store/slices/searchSlice.js'

export default function SearchOverlay(){
  const open = useSelector(s => s.search.open)
  const text = useSelector(s => s.search.text)
  const dispatch = useDispatch()
  if (!open) return null
  return (
    <div className="container" style={{paddingTop:16}}>
      <div className="searchbar">
        <input
          placeholder="Поиск по каталогу"
          value={text}
          onChange={(e)=>dispatch(setText(e.target.value))}
        />
      </div>
    </div>
  )
}
