import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from '../pages/HomePage'
import ThreadPage from '../pages/ThreadPage'
import NewThreadPage from '../pages/NewThreadPage'
import SignInPage from '../pages/SignInPage'
import NotFoundPage from '../pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'thread/:id', element: <ThreadPage /> },
      { path: 'new', element: <NewThreadPage /> },
      { path: 'signin', element: <SignInPage /> },
      { path: '*', element: <NotFoundPage /> }
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
