import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LocalStorage } from 'src/constants/localStorage';
import { setBoard } from 'src/redux/slices/board';
import { setHistory } from 'src/redux/slices/history';
import { RootState } from 'src/redux/store';

export type TUseLocalStorageHistoryReturn = { reset: () => void };

export const useLocalStorageHistory = (
  key: LocalStorage
): TUseLocalStorageHistoryReturn => {
  const dispatch = useDispatch();
  const action = {
    [LocalStorage.History]: setHistory,
    [LocalStorage.Board]: setBoard,
  };

  useEffect(() => {
    const value = localStorage.getItem(key);

    if (value) {
      const parsedValue = JSON.parse(value);
      dispatch(action[key]({ state: parsedValue }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reducerValue = useSelector((state: RootState) => state[key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(reducerValue));
  }, [reducerValue, key]);

  return { reset: () => localStorage.setItem(key, '') };
};
