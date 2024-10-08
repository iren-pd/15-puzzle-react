import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { TBoard } from 'src/redux/slices/board';

export type THistory = {
  index: number;
  list: TBoard[];
};

export type TAddToHistory = {
  board: TBoard;
};

export type TSetHistory = {
  state: THistory;
};

const initialState: THistory = {
  index: 0,
  list: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<TAddToHistory>) => {
      const board = action.payload.board;
      const list = state.list;

      if (list.length > state.index) list.splice(state.index);

      state.index += 1;
      list.push(board);
    },

    changePoint: (state, action: PayloadAction<THistory>) => {
      state.index = action.payload.index;
    },

    resetHistory: (state) => {
      state = initialState;
    },

    setHistory: (state, action: PayloadAction<TSetHistory>) => {
      state = action.payload.state;
    },
  },
});

export const { addToHistory, setHistory } = historySlice.actions;
export default historySlice.reducer;
