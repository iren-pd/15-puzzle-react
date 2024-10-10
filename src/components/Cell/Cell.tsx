import gsap from 'gsap';
import { useRef, useState } from 'react';
import cellBackground from '../../img/icon-board.svg';

export const Cell = ({
  isNear,
  cell,
  cellSize,
  handleReplaceCell,
  turnRunning,
  setTurnRunning,
}: {
  isNear: boolean;
  cell: number | null;
  cellSize: number;
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

  const onClickCell = () => {
    if (!turnRunning) {
      setTurnRunning(true);

      gsap
        .to(ref.current, {
          x: `+=${cellSize}`,
          duration: 2,
        })
        .eventCallback('onComplete', () => {
          setTurnRunning(false);
        });

      //   gsap.to(ref.current, { x: `-=${cellSize}` });
      //   gsap.to(ref.current, { y: `+=${cellSize}` });
      //   gsap.to(ref.current, { y: `-=${cellSize}` });
    }

    if (ref.current) {
      ref.current.addEventListener('click', onClickCell);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('click', onClickCell);
      }
    };
  };

  return (
    <div
      className={`relative border border-pink-500`}
      style={backgroundImage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (!turnRunning) {
          setTurnRunning(true);
          gsap
            .to(ref.current, { x: `+=${cellSize}`, duration: 2 })
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
      >
        {cell}
      </div>
    </div>
  );
};
