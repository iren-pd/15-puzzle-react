import { createBrowserRouter } from 'react-router-dom';
import { Config } from '../pages/Config';
import { Game } from '../pages/Game';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Config />,
  },
  {
    path: '/game',
    element: <Game />,
  }
]);
