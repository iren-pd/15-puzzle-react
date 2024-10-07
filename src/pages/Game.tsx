import { useSelector } from 'react-redux';
import cellBackground from '../img/icon-board.svg';
import { RootState } from '../redux/store';

export const Game = () => {
  const board = useSelector((state: RootState) => state.board);

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 ">
      {board.map((row, index) => (
        <div key={index} className="flex flex-col">
          {row.map((cell, index) => (
            <div
              key={index}
              className="border border-pink-700 px-8 py-4 text-center bg-white min-h-20 flex-1 text-pink-700 text-4xl font-bold"
              style={{
                backgroundImage: `url(${cellBackground})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
