const KEY = 'cart-v1'

export const saveCart = (state) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {}
}

export const loadCart = () => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : { items: [] }
  } catch {
    return { items: [] }
  }
}
