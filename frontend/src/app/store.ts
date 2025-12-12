import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authUser from '../features/auth/authSlice';
import accessToken from '../features/token/AccessTokenSlice';



export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authUser: authUser,
    accessToken : accessToken,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch