import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './layout'
import userReducer from './user'

export default configureStore({
  reducer: {
    layout: layoutReducer,
    user: userReducer
  }
})