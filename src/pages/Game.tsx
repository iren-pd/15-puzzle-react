import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Cell } from '../components/Cell/Cell';
import { Footer } from '../components/Footer/Footer';
import { setBoard, TBoard } from '../redux/slices/board';
import { RootState } from '../redux/store';

export interface TNullCellPosition {
  row: number;
  column: number;
}

export const Game = () => {
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cellSize = board.length
    ? Math.min(
        window.innerWidth / board[0].length,
        (window.innerHeight - 200) / board.length
      )
    : 0;

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

    return (
      (row === rowIndex && Math.abs(column - cellIndex) === 1) ||
      (column === cellIndex && Math.abs(row - rowIndex) === 1)
    );
  };

  const makeTurn = (
    board: TBoard,
    cell: [number, number],
    nullCell: { row: number; column: number },
    isNear: (rowIndex: number, cellIndex: number) => boolean
  ): TBoard => {
    const [row, column] = cell;
    const newBoard = [...board.map((row) => [...row])];

    newBoard[nullCell.row][nullCell.column] = board[row][column];
    newBoard[row][column] = null;

    return newBoard;
  };

  const handleReplaceCell = (rowIndex: number, cellIndex: number) => {
    if (isNear(rowIndex, cellIndex)) {
      const newBoard = makeTurn(board, [rowIndex, cellIndex], nullCell, isNear);
      dispatch(setBoard({ state: newBoard }));
    }
  };

  useEffect(() => {
    if (!board.length) {
      navigate('/15-puzzle-react/');
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 overflow-auto p-20">
      {board.length ? (
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
                onClick={() => handleReplaceCell(rowIndex, cellIndex)}
                position={{ row: rowIndex, column: cellIndex }}
                nullCell={nullCell}
              />
            ))
          )}
        </div>
      ) : (
        <div></div>
      )}

      <Footer />
    </div>
  );
};
