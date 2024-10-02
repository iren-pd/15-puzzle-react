import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../redux/slices/App';
import type { RootState } from '../redux/store';

export function App() {
  const count = useSelector((state: RootState) => state.app.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
