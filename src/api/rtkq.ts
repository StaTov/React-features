import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IData } from '../types';

export const api = createApi({
  reducerPath: 'freeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getAll: builder.query<IData[], string>({
      query: (limit) => `photos?_limit=${limit}`,
    }),
  }),
});

export const { useGetAllQuery } = api;
