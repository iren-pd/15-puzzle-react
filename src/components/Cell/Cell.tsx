import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import cellBackground from '../../img/icon-board.svg';
import gsap from 'gsap';

export const Cell = ({
  isNear,
  cell,
  cellSize,
  onClick,
}: {
  isNear: boolean;
  cell: number | null;
  cellSize: number;
  onClick: () => void;
}) => {
  const styleForCell =
    'px-2 text-3xl border border-pink-700 flex items-center justify-center text-pink-700 font-bold';
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP((context, contextSafe) => {
    const onClickCell = () => {
      if (contextSafe) {
        contextSafe(() => {
          if (ref.current) {
            gsap.to(ref.current, { x: `+=${cellSize}` });
          }
          console.log(contextSafe);

        })();
      }
    };

    if (ref.current) {
      ref.current.addEventListener('click', onClickCell);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('click', onClickCell);
      }
    };
  }, {});

  return (
    <div
      ref={ref}
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
      onClick={onClick}
    >
      {cell}
    </div>
  );
};
