import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import userHendelSlice from '../fetures/userHendelSlice/userHendelSlice'

export const store = configureStore({
    reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userHendelSlice
  },
  
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
})
