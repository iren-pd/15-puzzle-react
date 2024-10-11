import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices/board';
import { historySlice } from './slices/history';
import { timerSlice } from './slices/timer';

export const store = configureStore({
  reducer: {
    [boardSlice.name]: boardSlice.reducer,
    [historySlice.name]: historySlice.reducer,
    [timerSlice.name]: timerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
