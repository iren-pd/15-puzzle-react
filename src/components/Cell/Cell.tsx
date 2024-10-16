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
  const cellStyles =
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
  ): { x: string } | { y: string } | object => {
    const { row, column } = nullCell;

    switch (true) {
      // Вверх
      case column === cellIndex && row === rowIndex + 1:
        return { y: `+=${cellSize}` };

      // Вниз
      case column === cellIndex && row === rowIndex - 1:
        return { y: `-=${cellSize}` };

      // Вправо
      case row === rowIndex && column === cellIndex + 1:
        return { x: `+=${cellSize}` };

      // Влево
      case row === rowIndex && column === cellIndex - 1:
        return { x: `-=${cellSize}` };
      default:
        return {};
    }
  };

  const isNullCell = nullCell.row === rowIndex && nullCell.column === cellIndex;

  return (
    <div className={`relative border border-pink-500`} style={backgroundImage}>
      {!isNullCell && (
        <div
          ref={ref}
          className={`${cellStyles} ${
            isHovered && isNear ? ' cursor-pointer' : ''
          } `}
          style={{
            zIndex: isNullCell ? -1 : 50,
            pointerEvents: isNullCell ? 'none' : undefined,
            ...backgroundImage,
            backgroundColor:
              isHovered && isNear ? 'rgba(255, 182, 193, 0.5)' : 'transparent',
          }}
          onClick={() => {
            if (!turnRunning && isNear && !isNullCell) {
              setTurnRunning(true);
              gsap
                .to(ref.current, {
                  ...findDirection(rowIndex, cellIndex),
                  duration: 0.3,
                })
                .eventCallback('onComplete', (v) => {
                  setTurnRunning(false);
                  handleReplaceCell();
                });
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {cell}
        </div>
      )}
    </div>
  );
};
