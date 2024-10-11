import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { increment } from '../../redux/slices/timer';

export const Header = () => {
  const history = useSelector((state: RootState) => state.history);

  const timer = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();
  const steps = history.list.length;

  const stylesForSpan = 'font-bold text-pink-600';
  const stylesForText = 'text-lg text-pink-800';

  useEffect(() => {
    if (timer.isRunning) {
      const timer = setInterval(() => {
        dispatch(increment());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timer.isRunning, dispatch]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-pink-200 shadow-md rounded-lg p-4 flex justify-around items-center z-10">
      <p className={stylesForText}>
        Время: <span className={stylesForSpan}>{timer.formattedTime}</span>
      </p>

      <p className={stylesForText}>
        Ходы: <span className={stylesForSpan}>{steps}</span>
      </p>
    </div>
  );
};
