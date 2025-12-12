import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '@/types/Signup';

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

const initialState: AuthUser = {
  _id : getAuthUserFromLocalStorage()?._id || '',
  fullName: getAuthUserFromLocalStorage()?.fullName || '',
  username: getAuthUserFromLocalStorage()?.username || '',
  email: getAuthUserFromLocalStorage()?.email || '',
  password:  '',
  role:  getAuthUserFromLocalStorage()?.role || 'AUTHOR',
  gender:  getAuthUserFromLocalStorage()?.gender || '',
  bio:  getAuthUserFromLocalStorage()?.bio || '',
  profileImage:  getAuthUserFromLocalStorage()?.profileImage || '',
  createdAt:  getAuthUserFromLocalStorage()?.createdAt || '',
  updatedAt:  getAuthUserFromLocalStorage()?.updatedAt || '',
};

export const counterSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    // 💡 FIX: Return the new state object
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      // Immer detects that a new state object is returned and uses it.
      return action.payload; 
    },
    
    // Another common pattern: a reducer to clear/logout the user
    clearAuthUser: (state) => {
      // You can return the initialState directly
      return initialState; 
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuthUser, clearAuthUser } = counterSlice.actions

export default counterSlice.reducer;