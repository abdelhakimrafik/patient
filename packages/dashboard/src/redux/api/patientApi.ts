import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IPage, IPageFilter, IPatient } from './types';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getPatients: builder.query<IPage<IPatient>, IPageFilter>({
      query(params) {
        return {
          url: 'patients',
          params,
        };
      },
      transformResponse: (result: IPage<IPatient>) => {
        return result;
      },
    }),
  }),
});

export const { useGetPatientsQuery } = patientApi;
