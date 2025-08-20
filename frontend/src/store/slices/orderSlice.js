import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, endpoints } from '../../services/api.js'
import { clearCart } from './cartSlice.js'

export const submitOrder = createAsyncThunk('order/submit', async (payload, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await api.post(endpoints.order, payload)
    dispatch(clearCart())
    return data
  } catch (e) {
    return rejectWithValue(e?.response?.data || { message: e.message })
  }
})

const slice = createSlice({
  name: 'order',
  initialState: { status: 'idle', error: null, success: false },
  reducers: { reset(state){ state.status='idle'; state.error=null; state.success=false } },
  extraReducers: (b)=>{
    b.addCase(submitOrder.pending, (s)=>{s.status='loading'; s.error=null; s.success=false})
     .addCase(submitOrder.fulfilled, (s)=>{s.status='succeeded'; s.success=true})
     .addCase(submitOrder.rejected, (s,{payload,error})=>{s.status='failed'; s.error=(payload&&payload.message)||error.message})
  }
})

export const { reset } = slice.actions
export default slice.reducer
