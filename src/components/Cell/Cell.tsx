import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import cellBackground from '../../img/icon-board.svg';

export const Cell = ({
  isNear,
  cell,
  cellSize,
  onClick,
  turnRunning,
  setTurnRunning,
}: {
  isNear: boolean;
  cell: number | null;
  cellSize: number;
  onClick: () => void;
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

  useGSAP((context, contextSafe) => {
    const onClickCell = () => {
      if (contextSafe) {
        contextSafe(() => {
          if (ref.current) {
            gsap.to(ref.current, { x: `+=${cellSize}`, duration: 0.1 });
            //   gsap.to(ref.current, { x: `-=${cellSize}` });
            //   gsap.to(ref.current, { y: `+=${cellSize}` });
            //   gsap.to(ref.current, { y: `-=${cellSize}` });
          }
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
      className={`relative border border-pink-500`}
      style={backgroundImage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        ref={ref}
        className={`${styleForCell} ${
          isHovered && isNear ? ' cursor-pointer' : ''
        } `}
        style={{
          backgroundImage,
          backgroundColor:
            isHovered && isNear ? 'rgba(255, 182, 193, 0.5)' : 'transparent',
        }}
      >
        {cell}
      </div>
    </div>
  );
};
