import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api' }),
  endpoints: builder => ({
    getCountByCity: builder.query({
      query: () => '/hotels/countByCity?cities=berlin,madrid,london'
    }),
    getCountByType: builder.query({
      query: () => '/hotels/countByType'
    })
  })
})
export const { useGetCountByCityQuery, useGetCountByTypeQuery } = apiSlice