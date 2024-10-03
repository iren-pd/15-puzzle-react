import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const Board: FC = () => {
  const board = useSelector((state: RootState) => state.boardReducer.board);
  console.log(board);

  return <div>Board</div>;
};
