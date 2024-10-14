import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { createBoard, resetBoard } from '../redux/slices/board';
import { RootState } from '../redux/store';

type FormValues = {
  rows: number | '';
  columns: number | '';
};

export const Config = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const board = useSelector((state: RootState) => state.board);

  const labelStyles = 'flex justify-between items-center text-pink-700';
  const inputStyles =
    'mt-2 ml-2 p-2 border bg-pink-100 border-pink-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200 hover:border-pink-700';
  const buttonStyles =
    'px-4 py-2 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition duration-200';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { rows: '', columns: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!data.rows || !data.columns) return;
    dispatch(createBoard(data));
    navigation('/15-puzzle-react/game');
  };

  const sizeBoard = watch();

  const handleSizeButtonClick = (rows: number, columns: number) => {
    setValue('rows', rows);
    setValue('columns', columns);
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

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[3, 4, 5, 6, 8, 10].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeButtonClick(size, size)}
              className={`${buttonStyles} ${
                sizeBoard.rows === size ? 'bg-pink-700' : ''
              }`}
            >
              {size} x {size}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 p-4"
        >
          <h3 className="text-xl text-pink-700 font-bold text-center">
            Или создайте сами!
          </h3>

          <label htmlFor="rows" className={labelStyles}>
            Количество строк
            <input
              {...register('rows', {
                required: 'Укажите количество строк',
                min: {
                  value: 2,
                  message: 'Минимальное значение: 2',
                },
                max: {
                  value: 10,
                  message: 'Максимальное значение: 10',
                },
              })}
              type="number"
              className={inputStyles}
            />
          </label>

          <label htmlFor="columns" className={labelStyles}>
            Количество столбцов
            <input
              {...register('columns', {
                required: 'Укажите количество столбцов',
                min: {
                  value: 2,
                  message: 'Минимальное значение: 2',
                },
                max: {
                  value: 10,
                  message: 'Максимальное значение: 10',
                },
              })}
              type="number"
              className={inputStyles}
            />
          </label>

          <button type="submit" className={buttonStyles}>
            Начать игру
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};
