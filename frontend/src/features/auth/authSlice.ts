import { createSlice } from '@reduxjs/toolkit'
import type { AuthUser } from '@/types/Signup';
import type { RootState } from '@/app/store';

export const getAuthUserFromLocalStorage = (): AuthUser | null => {
  // 1. Retrieve the raw string value from localStorage
  const authUserJSON = localStorage.getItem("authUser");

  // 2. Check if the value is null (item does not exist) or an empty string
  if (!authUserJSON) {
    return null; // Return null if nothing is found
  }

  // 3. Attempt to parse the JSON string
  try {
    const authUser: AuthUser = JSON.parse(authUserJSON);

    // Optional: Perform a basic check to ensure the parsed object matches your expected structure
    if (typeof authUser === 'object' && authUser !== null && '_id' in authUser) {
      return authUser;
    }

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
  user: getAuthUserFromLocalStorage() || null,
  token: null,
};

export const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    // Called after a successful login/refresh
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      // Optionally, save token to local storage here if you must
    },
    // Called for logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Optionally, clear local storage here
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logout } = authSlice.actions;

// Selectors for reading data from the store
export const selectCurrentUser = (state : RootState) => state.authUser;

export default authSlice.reducer;