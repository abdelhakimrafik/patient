import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IInsurance } from './types';

export const insuranceApi = createApi({
  reducerPath: 'insuranceApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getInsurances: builder.query<IInsurance[], void>({
      query() {
        return {
          url: `insurances`,
        };
      },
    }),
  }),
});

export const { useGetInsurancesQuery } = insuranceApi;
