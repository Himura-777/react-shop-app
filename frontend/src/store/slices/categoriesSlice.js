import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, endpoints } from '../../services/api.js'

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const { data } = await api.get(endpoints.categories)
  return [{ id: 0, title: 'Все' }, ...data]
})

const slice = createSlice({
  name: 'categories',
  initialState: { items: [], status: 'idle', error: null, activeId: 0 },
  reducers: { setActive(state, { payload }) { state.activeId = payload } },
  extraReducers: (b) => {
    b.addCase(fetchCategories.pending, (s)=>{s.status='loading'; s.error=null})
     .addCase(fetchCategories.fulfilled, (s,{payload})=>{s.status='succeeded'; s.items=payload})
     .addCase(fetchCategories.rejected, (s,{error})=>{s.status='failed'; s.error=error.message})
  }
})

export const { setActive } = slice.actions
export default slice.reducer
