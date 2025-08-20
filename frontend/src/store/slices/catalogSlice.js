import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, endpoints } from '../../services/api.js'

export const fetchCatalog = createAsyncThunk('catalog/fetch', async (params) => {
  const { categoryId=0, offset=0, q='' } = params || {}
  const search = new URLSearchParams()
  if (categoryId && categoryId !== 0) search.set('categoryId', categoryId)
  if (offset) search.set('offset', offset)
  if (q) search.set('q', q)
  const url = `${endpoints.items}${search.toString() ? `?${search}` : ''}`
  const { data } = await api.get(url)
  return { data, append: Boolean(offset) }
})

const slice = createSlice({
  name: 'catalog',
  initialState: { items: [], status: 'idle', error: null, hasMore: true, q: '' },
  reducers: {
    reset(state){ state.items=[]; state.hasMore=true; state.status='idle'; state.error=null },
    setQ(state, {payload}){ state.q = payload }
  },
  extraReducers: (b)=>{
    b.addCase(fetchCatalog.pending, (s)=>{s.status='loading'; s.error=null})
     .addCase(fetchCatalog.fulfilled, (s,{payload})=>{
        s.status='succeeded';
        const incoming = payload.data
        if (payload.append) {
          s.items = [...s.items, ...incoming]
        } else {
          s.items = incoming
        }
        s.hasMore = incoming.length >= 6
     })
     .addCase(fetchCatalog.rejected, (s,{error})=>{s.status='failed'; s.error=error.message})
  }
})

export const { reset, setQ } = slice.actions
export default slice.reducer
