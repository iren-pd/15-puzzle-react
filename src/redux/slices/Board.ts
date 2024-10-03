import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type BoardType = (number | null)[];
export type BoardSizeType = { x: number; y: number };

export interface BoardState {
  board: BoardType[];
}

const initialState: BoardState = {
  board: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<BoardSizeType>) => {
      const { board } = state;
      const { x, y } = action.payload;
      const arr: BoardType = [];

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

export const { createBoard } = boardSlice.actions;

export default boardSlice.reducer;
