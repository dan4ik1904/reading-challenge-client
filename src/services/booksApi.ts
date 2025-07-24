import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverURL } from '../Data/URL'
import { IBook, ICreateBook } from '../types/book.interface'
import { RootState } from './store'

export const booksApi = createApi({
  reducerPath: 'booksApi',
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
  tagTypes: ['Books', 'Book', 'MyBooks'],
  endpoints: (builder) => ({
    getAllBooks: builder.query<IBook[], void>({
      query: () => '/books',
      providesTags: ['Books'],
    }),
    getOneBook: builder.query<IBook, number>({
      query: (id) => `/books/${id}`,
      providesTags: ['Book'],
    }),
    getBooksUser: builder.query<IBook[], number>({
      query: (id) => `/books/top/${id}`,
      providesTags: ['Books', 'MyBooks'],
    }),
    createBook: builder.mutation<IBook, { data: ICreateBook; tgID: number }>({
      query: ({ data, tgID }) => ({
        url: '/books',
        method: 'POST',
        body: data,
        headers: {
          Authorization: tgID.toString(),
        },
      }),
      invalidatesTags: ['MyBooks', 'Book', 'Books'],
    }),
    deleteBook: builder.mutation<void, { id: number; tgID: number }>({
      query: ({ id, tgID }) => ({
        url: `/books/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: tgID.toString(),
        },
      }),
      invalidatesTags: ['Books', 'Book', 'MyBooks'],
    }),
    getMyBooks: builder.query<IBook[], number>({
      query: (tgId) => ({
        url: '/auth/mybooks',
        headers: {
          'Telegram-ID': tgId.toString(),
        },
      }),
      providesTags: ['MyBooks']
    }),
  }),
})

export const {
  useGetAllBooksQuery,
  useGetOneBookQuery,
  useGetBooksUserQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetMyBooksQuery
} = booksApi