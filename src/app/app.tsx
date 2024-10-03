import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Board } from '../components/Board';
import { createBoard } from '../redux/slices/Board';

export const App: FC = () => {
  const dispatch = useDispatch();
  const boardSize = { x: 3, y: 5 };

  useEffect(() => {
    dispatch(createBoard(boardSize));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Board />
    </div>
  );
};
