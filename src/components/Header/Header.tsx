import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const Header = () => {
  const history = useSelector((state: RootState) => state.history);
  const [time, setTime] = useState(0);
  const steps = history.list.length;

  const stylesForSpan = 'font-bold text-pink-600';
  const stylesForText = 'text-lg text-pink-800';

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-pink-200 shadow-md rounded-lg p-4 flex justify-around items-center z-10">
      <p className={stylesForText}>
        Время: <span className={stylesForSpan}>{formatTime(time)}</span>
      </p>

      <p className={stylesForText}>
        Ходы: <span className={stylesForSpan}>{steps}</span>
      </p>
    </div>
  );
};
