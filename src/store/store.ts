import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import viewReducer from './slices/viewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    viewService: viewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
