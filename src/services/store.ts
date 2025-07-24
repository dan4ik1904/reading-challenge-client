import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './authApi'
import { booksApi } from './booksApi'
import telegramReducer from './telegramSlice'
import { usersApi } from './userApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
		telegram: telegramReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(booksApi.middleware)
      .concat(usersApi.middleware)
})

// Экспортируем тип RootState
export type RootState = ReturnType<typeof store.getState>

// Также экспортируем тип AppDispatch
export type AppDispatch = typeof store.dispatch