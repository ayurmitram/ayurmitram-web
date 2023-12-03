import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './layout'

export default configureStore({
  reducer: {
    layout: layoutReducer,
  }
})