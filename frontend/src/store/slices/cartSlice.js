import { createSlice } from '@reduxjs/toolkit'
import { loadCart, saveCart } from '../../utils/localStorage.js'

const initial = loadCart()

const findIndex = (items, { id, size }) => items.findIndex(i => i.id===id && i.size===size)

const cartSlice = createSlice({
  name: 'cart',
  initialState: initial, // {items:[{id,title,size,price,count}]}
  reducers: {
    addToCart(state, { payload }) {
      const idx = findIndex(state.items, payload)
      if (idx === -1) {
        state.items.push({ ...payload })
      } else {
        state.items[idx].count += payload.count
      }
      saveCart(state)
    },
    removeFromCart(state, { payload }) {
      state.items = state.items.filter((_, i) => i !== payload.index)
      saveCart(state)
    },
    clearCart(state) {
      state.items = []
      saveCart(state)
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
