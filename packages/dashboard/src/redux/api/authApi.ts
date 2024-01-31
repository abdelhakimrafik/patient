import { createApi } from '@reduxjs/toolkit/query/react';
import { TLoginFormData } from '../../pages/Login';
import customFetchBase from './customFetchBase';
import { userApi } from './userApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { access_token: string; refresh_token: string; status: string },
      TLoginFormData
    >({
      query(data) {
        return {
          url: 'auth/signin',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log('ERROR', error);
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/signout',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApi;
