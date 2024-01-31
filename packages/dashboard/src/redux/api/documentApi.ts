import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IDocument, IDocumentApiResponse, IPage, IPageFilter } from './types';

export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getDocuments: builder.query<IPage<IDocument>, IPageFilter>({
      query(params) {
        return {
          url: 'documents',
          params,
        };
      },
      transformResponse: (
        result: IPage<IDocumentApiResponse>,
      ): IPage<IDocument> => {
        const { data, ...page } = result;
        const transformedData = data.map((doc) => {
          const {
            createdAt,
            updatedAt,
            patient: { insurance, ...rest },
          } = doc;
          return { ...rest, insurance: insurance.name, createdAt, updatedAt };
        });
        return { ...page, data: transformedData };
      },
    }),
  }),
});

export const { useGetDocumentsQuery } = documentApi;
