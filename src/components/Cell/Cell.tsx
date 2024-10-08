import { useState } from 'react';
import cellBackground from '../../img/icon-board.svg';

export const Cell = ({
  isNear,
  cell,
}: {
  isNear: boolean;
  cell: number | null;
}) => {
  const styleForCell =
    'text-4xl border border-pink-700 flex items-center justify-center text-pink-700 font-bold';
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
        width: '100px',
        height: '100px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cell}
    </div>
  );
};
