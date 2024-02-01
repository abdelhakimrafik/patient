import { createApi } from '@reduxjs/toolkit/query/react';
import { TLoginFormData } from '../../pages/Login';
import customFetchBase from './customFetchBase';

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
    }),
    signupUser: builder.mutation<void, TLoginFormData>({
      query(data) {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: data,
        };
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/signout',
          method: 'POST',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useLogoutUserMutation,
} = authApi;
