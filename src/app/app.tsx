import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Board } from '../components/Board';
import { createBoard } from '../redux/slices/board';
import { addToHistory } from '../redux/slices/history';

export const App: FC = () => {
  const dispatch = useDispatch();
  const boardSize = { rows: 2, columns: 2 };

  useEffect(() => {
    dispatch(createBoard(boardSize));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(
      addToHistory({
        board: [
          [1, null],
          [2, 3],
        ],
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Board />
    </div>
  );
};
