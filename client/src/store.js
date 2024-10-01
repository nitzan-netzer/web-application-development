import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productsSlice'

export const store = configureStore({
  reducer: {
    products: productReducer
  },
})