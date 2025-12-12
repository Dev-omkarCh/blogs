import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AccessToken {
    accessToken: string
}

export const getAccessTokenFromLocalStorage = (): string | null => {
    // 1. Retrieve the raw string value from localStorage
    const accessTokenJSON = localStorage.getItem("accessToken");

    // 2. Check if the value is null (item does not exist) or an empty string
    if (!accessTokenJSON) {
        return null; // Return null if nothing is found
    }

    // 3. Attempt to parse the JSON string
    try {
        const accessToken : string = JSON.parse(accessTokenJSON);
        
        // Optional: Perform a basic check to ensure the parsed object matches your expected structure
        if (typeof accessToken === 'string' && accessToken !== null) {
             return accessToken;
        }
        
        // If the parsed object is invalid, clear the localStorage entry and return null
        localStorage.removeItem("accessToken");
        return null;

    } catch (e) {
        // Handle JSON parsing errors (e.g., corrupted storage)
        console.error("Error parsing AccessToken from localStorage:", e);
        localStorage.removeItem("accessToken"); // Clear corrupted data
        return null;
    }
};

const initialState: AccessToken = {
  accessToken: getAccessTokenFromLocalStorage() || '',
}

export const counterSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) =>{
        state.accessToken = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAccessToken } = counterSlice.actions

export default counterSlice.reducer;