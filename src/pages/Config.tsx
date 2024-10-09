import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { createBoard, resetBoard } from '../redux/slices/board';
import { RootState } from '../redux/store';

export const Config = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const board = useSelector((state: RootState) => state.board);
  const [sizeBoard, setSizeBoard] = useState({ rows: 0, columns: 0 });

  const handleSizeBoardInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setSizeBoard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeButtonClick = (rows: number, columns: number) => {
    setSizeBoard({ rows, columns });
  };

  const handleSizeBoardSubmit = () => {
    if (!sizeBoard.rows || !sizeBoard.columns) return;

    dispatch(createBoard(sizeBoard));
    navigation('/15-puzzle-react/game');
  };

  useEffect(() => {
    if (board.length) {
      dispatch(resetBoard());
    }
  }, [board.length, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center">
      <div className="flex flex-col space-y-4 p-4 bg-pink-300 rounded-lg shadow-lg">
        <h1 className="text-2xl text-pink-700 font-bold mb-2 text-center">
          Выберите размер поля
        </h1>

        <div className="grid grid-cols-3 gap-4 mb-4 pb-">
          {[3, 4, 5, 6, 8, 10].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeButtonClick(size, size)}
              className={`px-4 py-2 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition duration-200 ${
                sizeBoard.rows === size ? 'bg-pink-700' : ''
              }`}
            >
              {size} x {size}
            </button>
          ))}
        </div>

        <div className="flex flex-col space-y-4 p-4">
          <h3 className="text-xl text-pink-700 font-bold text-center">
            Или создайте сами!
          </h3>
          <label
            htmlFor="rows"
            className="flex justify-between items-center text-pink-700"
          >
            Количество строк
            <input
              name="rows"
              value={sizeBoard.rows === 0 ? '' : sizeBoard.rows}
              onChange={handleSizeBoardInput}
              type="number"
              className="mt-2 ml-2 p-2 border bg-pink-100 border-pink-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200 hover:border-pink-700"
            />
          </label>

          <label
            htmlFor="columns"
            className="flex justify-between items-center text-pink-700"
          >
            Количество столбцов
            <input
              name="columns"
              value={sizeBoard.columns === 0 ? '' : sizeBoard.columns}
              onChange={handleSizeBoardInput}
              type="number"
              className="mt-2 ml-2 p-2 border bg-pink-100 border-pink-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200 hover:border-pink-700"
            />
          </label>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSizeBoardSubmit}
          className="px-4 py-2 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition duration-200"
        >
          Начать игру
        </button>
      </div>

      <Footer />
    </div>
  );
};
