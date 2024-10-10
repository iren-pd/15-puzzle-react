import gsap from 'gsap';
import { useRef, useState } from 'react';
import cellBackground from '../../img/icon-board.svg';

export const Cell = ({
  isNear,
  cell,
  cellSize,
  nullCell,
  cellIndex,
  rowIndex,
  handleReplaceCell,
  turnRunning,
  setTurnRunning,
}: {
  isNear: boolean;
  cell: number | null;
  cellSize: number;
  nullCell: { row: number; column: number };
  cellIndex: number;
  rowIndex: number;
  handleReplaceCell: () => void;
  turnRunning: boolean;
  setTurnRunning: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const styleForCell =
    'px-2 text-3xl flex items-center justify-center text-pink-700 font-bold absolute inset-0';
  const backgroundImage = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    backgroundImage: `url(${cellBackground})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const findDirection = (
    rowIndex: number,
    cellIndex: number
  ): { x: string } | { y: string } | null => {
    const { row, column } = nullCell;

    switch (true) {
      // Вверх
      case column === cellIndex && row === rowIndex - 1:
        return { y: `+=${cellSize}` };

      // Вниз
      case column === cellIndex && row === rowIndex + 1:
        return { y: `-=${cellSize}` };

      // Вправо
      case row === rowIndex && column === cellIndex - 1:
        return { x: `+=${cellSize}` };

      // Влево
      case row === rowIndex && column === cellIndex + 1:
        return { x: `-=${cellSize}` };
      default:
        return null;
    }
  };

  const [text, _] = useState(cell);

  return (
    <div
      className={`relative border border-pink-500`}
      style={backgroundImage}
      onClick={() => {
        if (!turnRunning && isNear) {
          setTurnRunning(true);
          gsap
            .to(ref.current, { ...findDirection, duration: 0.3 })
            .eventCallback('onComplete', (v) => {
              setTurnRunning(false);
              handleReplaceCell();
            });
        }
      }}
    >
      <div
        ref={ref}
        className={`${styleForCell} ${
          isHovered && isNear ? ' cursor-pointer' : ''
        } `}
        style={{
          zIndex: 50,
          backgroundImage,
          backgroundColor:
            isHovered && isNear ? 'rgba(255, 182, 193, 0.5)' : 'transparent',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
      </div>
    </div>
  );
};
