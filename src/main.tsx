import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { ErrorPage, Layout } from './components';
import AboutPage from './pages/AboutPage';
import FilmPage, { movieLoader } from './pages/FilmPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'Movies',
        element: <FilmPage />,
        loader: movieLoader
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
