import { createSlice } from '@reduxjs/toolkit';

export type TTimerState = {
  time: number;
  isRunning: boolean;
  formattedTime: string;
};

export const initialState: TTimerState = {
  time: 0,
  isRunning: false,
  formattedTime: '00:00',
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    increment: (state) => {
      state.time += 1;

      const minutes = Math.floor(state.time / 60);
      const seconds = state.time % 60;
      state.formattedTime = `${String(minutes).padStart(2, '0')}:${String(
        seconds
      ).padStart(2, '0')}`;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.time = 0;
    },
  },
});

export const { startTimer, increment, stopTimer, resetTimer } = timerSlice.actions;

export const timerReducer = timerSlice.reducer;
