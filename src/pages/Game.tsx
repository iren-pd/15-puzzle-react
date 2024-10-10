import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Cell } from '../components/Cell/Cell';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
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
  const [turnRunning, setTurnRunning] = useState(false);

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
    nullCell: { row: number; column: number }
  ): TBoard => {
    const [row, column] = cell;
    const newBoard = [...board.map((row) => [...row])];

    newBoard[nullCell.row][nullCell.column] = board[row][column];
    newBoard[row][column] = null;

    return newBoard;
  };

  const handleReplaceCell = (rowIndex: number, cellIndex: number) => {
    if (isNear(rowIndex, cellIndex)) {
      const newBoard = makeTurn(board, [rowIndex, cellIndex], nullCell);
      dispatch(setBoard({ state: newBoard }));
    }
  };

  useEffect(() => {
    if (!board.length) {
      navigate('/15-puzzle-react/');
    }
  }, []);

  const [boardState, setBoardState] = useState(board);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-pink-50 overflow-auto p-20">
        {board.length && (
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${boardState[0].length}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${boardState.length}, ${cellSize}px)`,
            }}
          >
            {boardState.map((row, rowIndex) =>
              row.map((cell, cellIndex) => {
                const cellNumber = board[rowIndex][cellIndex];

                return (
                  <Cell
                    key={`${rowIndex}-${cellIndex}`}
                    cell={cellNumber}
                    isNear={isNear(rowIndex, cellIndex)}
                    cellSize={cellSize}
                    handleReplaceCell={() =>
                      handleReplaceCell(rowIndex, cellIndex)
                    }
                    nullCell={nullCell}
                    cellIndex={cellIndex}
                    rowIndex={rowIndex}
                    turnRunning={turnRunning}
                    setTurnRunning={setTurnRunning}
                  />
                );
              })
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
