import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICredentials, IUser } from '../api/types';

interface IAuthState {
  user: IUser | null;
  credentials: ICredentials | null;
}

const initialState: IAuthState = {
  user: null,
  credentials: JSON.parse(localStorage.getItem('credentials') || '{}'),
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => {
      localStorage.removeItem('credentials');
      return { user: null, credentials: null };
    },
    setCredentials: (state, action: PayloadAction<ICredentials>) => {
      localStorage.setItem('credentials', JSON.stringify(action.payload));
      state.credentials = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setCredentials, setUser } = userSlice.actions;
