import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slices/AuthSlice'
import ConfigSlice from './slices/ConfigSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    config: ConfigSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch