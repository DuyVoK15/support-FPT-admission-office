// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from '../features/student/authSlice';
import postReducer from '../features/student/postSlice';
import accountReducer from'../features/student/accountSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    account: accountReducer,
    // Thêm reducers khác nếu cần thiết
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
