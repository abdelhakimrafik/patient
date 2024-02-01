import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logout } from '../features/authSlice';

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
  const token = (api.getState() as any).authState.credentials?.access_token;
  const config: FetchArgs = {
    url: isArgsString ? args : args.url,
    headers: {
      authorization: `Bearer ${token}`,
      ...headers,
    },
    ...rest,
  };

  await mutex.waitForUnlock();
  let result = await baseQuery(config, api, extraOptions);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((result.error?.data as any)?.code === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { credentials: 'include', url: 'auth/refresh' },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          window.location.href = '/login';
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
