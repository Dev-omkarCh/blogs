import { createSlice } from '@reduxjs/toolkit'
import type { AuthUser } from '@/types/Signup';
import type { RootState } from '@/app/store';

export const getAuthUserFromLocalStorage = (): AuthUser | null => {

  // Retrieve the raw string value from localStorage
  const authUserJSON = localStorage.getItem("authUser");

  // Check if the value is null (item does not exist) or an empty string
  if (!authUserJSON) return null; // Return null if nothing is found
  
  // Attempt to parse the JSON string
  try {
    const authUser: AuthUser = JSON.parse(authUserJSON);

    // Optional: Perform a basic check to ensure the parsed object matches your expected structure
    if (typeof authUser === 'object' && authUser !== null && '_id' in authUser) {
      return authUser;
    };

    // If the parsed object is invalid, clear the localStorage entry and return null
    localStorage.removeItem("authUser");
    return null;

  } catch (e) {
    
    // Handle JSON parsing errors (e.g., corrupted storage)
    console.error("Error parsing authUser from localStorage:", e);
    localStorage.removeItem("authUser"); // Clear corrupted data
    return null;
  }
};

const initialState = {
  isAuthenticated: false,
  user: getAuthUserFromLocalStorage() || null,
  token: null,
  isLoading: true,
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