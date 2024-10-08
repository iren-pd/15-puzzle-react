import { useSelector } from 'react-redux';
import { Cell } from '../components/Cell/Cell';
import { Footer } from '../components/Footer/Footer';
import { TBoard } from '../redux/slices/board';
import { RootState } from '../redux/store';

export interface TNullCellPosition {
  row: number;
  column: number;
}

export const Game = () => {
  const board = useSelector((state: RootState) => state.board);
  const cellSize = Math.min(
    window.innerWidth / board[0].length,
    (window.innerHeight - 200) / board.length
  );

  const findNullCell = (board: TBoard): TNullCellPosition => {
    if (!board.length) return { row: 0, column: 0 };

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null) return { row: i, column: j };
      }
    }

    return { row: 0, column: 0 };
  };
  const nullCell = findNullCell(board);

  const isNear = (rowIndex: number, cellIndex: number) => {
    const { row, column } = nullCell;

    const neighbor = {
      top: row === rowIndex - 1 && column === cellIndex,
      bottom: row === rowIndex + 1 && column === cellIndex,
      right: row === rowIndex && column === cellIndex + 1,
      left: row === rowIndex && column === cellIndex - 1,
    };

    return neighbor.top || neighbor.bottom || neighbor.right || neighbor.left;
  };

  //   const makeTurn = (board: TBoard, cell: [number, number]): TBoard => {
  //     const [row, column] = cell;
  //   };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 overflow-auto p-20">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${board.length}, ${cellSize}px)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              cell={cell}
              isNear={isNear(rowIndex, cellIndex)}
              cellSize={cellSize}
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};
