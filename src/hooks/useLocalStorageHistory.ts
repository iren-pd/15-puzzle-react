import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LocalStorage } from 'src/constants/localStorage';
import { setBoard } from 'src/redux/slices/board';
import { setHistory } from 'src/redux/slices/history';

export type TUseLocalStorageHistoryReturn = { reset: () => void };

export const useLocalStorageHistory = (
  key: LocalStorage
): TUseLocalStorageHistoryReturn => {
  const dispatch = useDispatch();
  const action = {
    history: setHistory,
    board: setBoard,
  };

  useEffect(() => {
    const value = localStorage.getItem(key);

    if (value) {
      const parsedValue = JSON.parse(value);
      dispatch(action[key]({ state: parsedValue }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { reset: () => localStorage.setItem(key, '') };
};
