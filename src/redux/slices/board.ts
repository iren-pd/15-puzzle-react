import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type TBoard = (number | null)[][];
export type TBoardSize = { rows: number; columns: number };
export type TSetBoard = {
  state: TBoard;
};

const initialState: TBoard = [];

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<TBoardSize>) => {
      const board = state;
      const { rows, columns } = action.payload;
      const arr: (number | null)[] = [];

      if (board.length) state = [];

      for (let i = 1; i <= rows * columns - 1; i++) {
        arr.push(i);
      }

      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      arr.push(null);

      for (let i = 0; i <= arr.length; i++) {
        while (arr.length) {
          const row = arr.splice(0, columns);
          board.push(row);
        }
      }
    },

    setBoard: (state, action: PayloadAction<TSetBoard>) => {
      state = action.payload.state;
    },
  },
});

export const { createBoard, setBoard } = boardSlice.actions;

export default boardSlice.reducer;
