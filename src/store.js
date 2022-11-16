import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './account'

export default configureStore({
  reducer: {
    account: accountReducer,
  },
})