import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logout, setCredentials } from '../features/authSlice';
import { ICredentials } from './types';

const baseUrl = `${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const isArgsString = typeof args === 'string';
  const { headers, ...rest } = isArgsString ? { headers: {} } : args;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokens = (api.getState() as any).authState.credentials as ICredentials;
  const config: FetchArgs = {
    url: isArgsString ? args : args.url,
    headers: {
      authorization: `Bearer ${tokens?.access_token}`,
      ...headers,
    },
    ...rest,
  };

  await mutex.waitForUnlock();
  let result = await baseQuery(config, api, extraOptions);
  console.log('###>', result);

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: 'auth/refresh',
            method: 'POST',
            body: { token: tokens.refresh_token },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const credentials = refreshResult.data as unknown as ICredentials;
          api.dispatch(setCredentials(credentials));
          const configAlt: FetchArgs = {
            url: isArgsString ? args : args.url,
            headers: {
              authorization: `Bearer ${credentials.access_token}`,
              ...headers,
            },
            ...rest,
          };
          result = await baseQuery(configAlt, api, extraOptions);
        } else {
          api.dispatch(logout());
          window.location.href = '/auth/login';
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;
