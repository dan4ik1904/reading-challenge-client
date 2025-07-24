import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverURL } from '../Data/URL'
import { IUser } from '../types/user.interface'
import { RootState } from './store'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ 
			baseUrl: serverURL + '/api',
			prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState
        const userId = state.telegram.initData?.user?.id
        
        if (userId) {
          headers.set('Authorization', userId.toString())
        }
        
        return headers
      }
	}),
  tagTypes: ['Users', 'User', 'MyBooks'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    getOneUser: builder.query<IUser, number>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
    getClassmates: builder.query<IUser[], number>({
      query: (tgId) => ({
        url: '/users/classmates',
        headers: {
          'Telegram-ID': tgId.toString(),
        },
      }),
    }),
    getTopUsers: builder.query<IUser[], { page: number; limit: number }>({
      query: ({ page, limit }) => `/users/top?page=${page}&limit=${limit}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => [...currentCache, ...newItems],
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page
      },
    }),
    getTopFiveUsers: builder.query<IUser[], void>({
      query: () => '/users/top?limit=5&page=1',
    })
  }),
})

export const {
  useGetAllUsersQuery,
  useGetOneUserQuery,
  useGetClassmatesQuery,
  useGetTopUsersQuery,
  useGetTopFiveUsersQuery,
	useLazyGetTopFiveUsersQuery,
} = usersApi