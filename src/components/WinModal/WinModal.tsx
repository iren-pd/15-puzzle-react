import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import hearts from '../../img/win.gif';
import { RootState } from '../../redux/store';

interface ModalProps {
  message: string;
  onClose: () => void;
}

export const WinModal: React.FC<ModalProps> = ({ onClose }) => {
  const history = useSelector((state: RootState) => state.history);
  const timer = useSelector((state: RootState) => state.timer);
  const navigate = useNavigate();
  const steps = history.list.length;

  const stylesForText = 'text-center mb-2 text-gray-900 text-2xl';
  const stylesForSpan = 'font-semibold text-pink-600';

  const handleGoToMain = () => {
    onClose();
    navigate('/15-puzzle-react/');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div
        className="rounded-lg p-8 shadow-lg w-1/3 max-w-screen-md"
        style={{
          backgroundImage: `url(${hearts})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minWidth: '350px',
          backgroundColor: '#f8f8f8',
        }}
      >
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-center text-pink-600 mb-4">
            Вы выиграли!
          </h2>
          <p className={stylesForText}>
            Количество ходов: <span className={stylesForSpan}>{steps}</span>
          </p>
          <p className={stylesForText}>
            Время: <span className={stylesForSpan}>{timer.formattedTime}</span>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoToMain}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
};
