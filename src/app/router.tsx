import { ROUTES } from '../shared/model/routes'
import { createBrowserRouter } from 'react-router-dom'
import { App } from './app'
import { Providers } from './providers'
import { protectedLoader, ProtectedRoute } from './protected-route'
import { AppHeader } from '@/features/header'

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.HOME,
        loader: protectedLoader,
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            index: true, // Этот маршрут будет отображаться по умолчанию для '/'
            lazy: () => import('@/features/boards-list/boards-list.page'),
          },
          {
            path: ROUTES.BOARDS,
            lazy: () => import('@/features/boards-list/boards-list.page'),
          },
          {
            path: ROUTES.FAVORITE_BOARDS,
            lazy: () =>
              import('@/features/boards-list/boards-list-favorite.page'),
          },
          {
            path: ROUTES.RECENT_BOARDS,
            lazy: () =>
              import('@/features/boards-list/boards-list-recent.page'),
          },
          {
            path: ROUTES.BOARD,
            lazy: () => import('@/features/board/board.page'),
          },
        ],
      },

      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page'),
      }
    ]
  }
])
