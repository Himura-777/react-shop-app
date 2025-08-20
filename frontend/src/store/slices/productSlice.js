import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, endpoints } from '../../services/api.js'

export const fetchProduct = createAsyncThunk('product/fetch', async (id) => {
  const { data } = await api.get(endpoints.item(id))
  return data
})

const slice = createSlice({
  name: 'product',
  initialState: { item: null, status: 'idle', error: null },
  reducers: { reset(state){ state.item=null; state.status='idle'; state.error=null } },
  extraReducers: (b)=>{
    b.addCase(fetchProduct.pending, (s)=>{s.status='loading'; s.error=null})
     .addCase(fetchProduct.fulfilled, (s,{payload})=>{s.status='succeeded'; s.item=payload})
     .addCase(fetchProduct.rejected, (s,{error})=>{s.status='failed'; s.error=error.message})
  }
})

export const { reset } = slice.actions
export default slice.reducer
