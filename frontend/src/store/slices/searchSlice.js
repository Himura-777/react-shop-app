import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'search',
  initialState: { open: false, text: '' },
  reducers: {
    toggle(state){ state.open = !state.open },
    close(state){ state.open = false },
    setText(state, {payload}){ state.text = payload }
  }
})

export const { toggle, close, setText } = slice.actions
export default slice.reducer
