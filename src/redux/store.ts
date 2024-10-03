import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './slices/Board';

export const store = configureStore({
  reducer: {
    boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
