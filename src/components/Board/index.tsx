import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const Board: FC = () => {
  const board = useSelector((state: RootState) => state.board);
  const history = useSelector((state: RootState) => state.history);

  return <div>Board</div>;
};
