import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800/api' }),
  endpoints: builder => ({
    // Home page
    getCountByCity: builder.query({
      query: () => '/hotels/countByCity?cities=berlin,madrid,london'
    }),
    getCountByType: builder.query({
      query: () => '/hotels/countByType'
    }),
    getFeaturedProperties: builder.query({
      query: () => '/hotels?featured=true&limit=4'
    })
  })
})
export const { useGetCountByCityQuery, useGetCountByTypeQuery, useGetFeaturedPropertiesQuery } = apiSlice