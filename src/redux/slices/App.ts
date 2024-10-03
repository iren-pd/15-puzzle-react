import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type Board = (number | null)[];

export interface AppState {
  board: Board[];
}

const initialState: AppState = {
  board: [],
};

export const appSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { board } = state;
      const { x, y } = action.payload;
      const arr: Board = [];

      for (let i = 1; i <= x * y - 1; i++) {
        arr.push(i);
      }

      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      arr.push(null);

      for (let i = 0; i <= arr.length; i++) {
        while (arr.length) board.push(arr.splice(0, y));
      }
    },
  },
});

export const { createBoard } = appSlice.actions;

export default appSlice.reducer;
