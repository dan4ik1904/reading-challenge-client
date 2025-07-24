import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverURL } from '../Data/URL'
import { IUser } from '../types/user.interface'
import { RootState } from './store'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: serverURL + '/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const userId = state.telegram.initData?.user?.id
      
      if (userId) {
        headers.set('Authorization', userId.toString())
      }
      
      return headers
    }
  }),
  tagTypes: ['Me'],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, void>({
      query: () => 'me',
      providesTags: ['Me']
    }),
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Me']
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST'
      }),
      invalidatesTags: ['Me']
    })
  })
})

export const { 
  useGetMeQuery, 
  useLoginMutation, 
  useLogoutMutation 
} = authApi