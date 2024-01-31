import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IInsurance, IPatient } from './types';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getPatient: builder.query<IPatient<IInsurance>, { id: string }>({
      query(params) {
        return {
          url: `patients/${params.id}`,
          params,
        };
      },
    }),
  }),
});

export const { useGetPatientQuery, useLazyGetPatientQuery } = patientApi;
