import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Cell } from '../components/Cell/Cell';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { WinModal } from '../components/WinModal/WinModal';
import { setBoard, TBoard } from '../redux/slices/board';
import { addToHistory } from '../redux/slices/history';
import { RootState } from '../redux/store';
import { resetTimer, startTimer, stopTimer } from '../redux/slices/timer';

export interface TNullCellPosition {
  row: number;
  column: number;
}

export const Game = () => {
  const board = useSelector((state: RootState) => state.board);
  const timer = useSelector((state: RootState) => state.timer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [turnRunning, setTurnRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const isWinBoard = (currentBoard: TBoard, rows: number, columns: number) => {
    const winBoard: TBoard = [];
    const arr: (number | null)[] = [];

    for (let i = 1; i <= rows * columns - 1; i++) {
      arr.push(i);
    }
    arr.push(null);

    for (let i = 0; i < rows; i++) {
      winBoard.push(arr.splice(0, columns));
    }

    return JSON.stringify(currentBoard) === JSON.stringify(winBoard);
  };

  const handleReplaceCell = (rowIndex: number, cellIndex: number) => {
    if (isNear(rowIndex, cellIndex)) {
      const newBoard = makeTurn(board, [rowIndex, cellIndex], nullCell);
      dispatch(setBoard({ state: newBoard }));
      dispatch(addToHistory({ board: newBoard }));

      if (isWinBoard(newBoard, board.length, board[0].length)) {
        dispatch(stopTimer());
        setIsModalOpen(true);
      }
    }
  };

  useEffect(() => {
    if (!board.length) {
      navigate('/15-puzzle-react/');
    }
  }, []);

  useEffect(() => {
    dispatch(resetTimer());
    dispatch(startTimer());

  }, [dispatch]);

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

      {isModalOpen && (
        <WinModal
          message="Вы выиграли!"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
