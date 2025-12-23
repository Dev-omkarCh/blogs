import { createSlice } from '@reduxjs/toolkit'
import type { AuthUser } from '@/types/Signup';
import type { RootState } from '@/app/store';

const initialState = {
  isAuthenticated: false,
  user: null as AuthUser | null,
  token: null,
  isLoading: false,
  setIsLoading: (state: any, action: any) => {
    state.isLoading = action.payload;
  },
};

export const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    // Called after a successful login/refresh
    setCredentials: (state, action) => {
      const { user, accessToken, isAuthenticated, isLoading, setIsLoading } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = isAuthenticated;
      state.isLoading = isLoading;
      state.setIsLoading = setIsLoading;
    },

    // Called on logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logout } = authSlice.actions;

// Selectors for reading data from the store
export const selectCurrentUser = (state : RootState) => state.authUser;

export default authSlice.reducer;