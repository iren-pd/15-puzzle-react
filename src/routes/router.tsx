import { createBrowserRouter } from 'react-router-dom';
import { Config } from '../pages/Config';
import { Game } from '../pages/Game';

export const router = createBrowserRouter([
  {
    path: '/15-puzzle-react/',
    element: <Config />,
  },
  {
    path: '/15-puzzle-react/game',
    element: <Game />,
  },
]);
