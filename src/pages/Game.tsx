import { useSelector } from 'react-redux';
import { Footer } from '../components/Footer/Footer';
import cellBackground from '../img/icon-board.svg';
import { RootState } from '../redux/store';

export const Game = () => {
  const board = useSelector((state: RootState) => state.board);

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 overflow-auto">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, 100px)`,
          gridTemplateRows: `repeat(${board.length}, 100px)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className="text-4xl border border-pink-700 flex items-center justify-center text-pink-700 font-bold"
              style={{
                backgroundImage: `url(${cellBackground})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100px',
                height: '100px',
              }}
            >
              {cell}
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};
