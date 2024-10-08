import { useState } from 'react';
import cellBackground from '../../img/icon-board.svg';

export const Cell = ({
  isNear,
  cell,
  cellSize,
}: {
  isNear: boolean;
  cell: number | null;
  cellSize: number;
}) => {
  const styleForCell =
    'px-2 text-3xl border border-pink-700 flex items-center justify-center text-pink-700 font-bold';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styleForCell} ${
        isHovered && isNear ? 'bg-pink-300 cursor-pointer' : ''
      }`}
      style={{
        backgroundImage: `url(${cellBackground})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: `${cellSize}px`,
        height: `${cellSize}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cell}
    </div>
  );
};
