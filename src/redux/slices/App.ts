import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  value: number;
}

const initialState: AppState = {
  value: 0,
};

export const appSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

const createBord = (x: number, y: number): (number | null)[][] => {
  const arr = [];
  const result = [];

  for (let i = 1; i <= x * y - 1; i++) {
    arr.push(i);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  arr.push(null);

  for (let i = 0; i <= arr.length; i++) {
    while (arr.length) result.push(arr.splice(0, y));
  }

  return result;
};

console.log(createBord(3, 4));

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = appSlice.actions;

export default appSlice.reducer;
