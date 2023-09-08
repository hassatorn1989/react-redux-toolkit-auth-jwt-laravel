import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:8000/api'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (credentials) => ({
                url: '/auth/user/4',
                method: 'GET',
                body: credentials,
            }),
        }),
    }),
})

export const { useUserLoginMutation } = authApi