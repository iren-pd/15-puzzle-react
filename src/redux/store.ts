import { configureStore } from '@reduxjs/toolkit';
import { historySlice } from './slices/history';
import { boardSlice } from './slices/board';

export const store = configureStore({
  reducer: {
    [boardSlice.name]: boardSlice.reducer,
    [historySlice.name]: historySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
