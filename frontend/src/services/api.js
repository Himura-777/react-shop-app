import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:7070'
export const api = axios.create({ baseURL })

export const endpoints = {
  topSales: '/api/top-sales',
  categories: '/api/categories',
  items: '/api/items',
  item: (id) => `/api/items/${id}`,
  order: '/api/order',
}
