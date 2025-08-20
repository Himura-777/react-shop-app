import { configureStore } from '@reduxjs/toolkit'
import cart from './slices/cartSlice.js'
import categories from './slices/categoriesSlice.js'
import catalog from './slices/catalogSlice.js'
import topSales from './slices/topSalesSlice.js'
import product from './slices/productSlice.js'
import order from './slices/orderSlice.js'
import search from './slices/searchSlice.js'

export const store = configureStore({
  reducer: { cart, categories, catalog, topSales, product, order, search },
})
