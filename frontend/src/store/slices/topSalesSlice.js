import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, endpoints } from '../../services/api.js'

export const fetchTopSales = createAsyncThunk('topSales/fetch', async () => {
  const { data } = await api.get(endpoints.topSales)
  return data
})

const slice = createSlice({
  name: 'topSales',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b)=>{
    b.addCase(fetchTopSales.pending, (s)=>{s.status='loading'; s.error=null})
     .addCase(fetchTopSales.fulfilled, (s,{payload})=>{s.status='succeeded'; s.items=payload})
     .addCase(fetchTopSales.rejected, (s,{error})=>{s.status='failed'; s.error=error.message})
  }
})

export default slice.reducer
