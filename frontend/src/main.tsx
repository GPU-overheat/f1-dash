import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from './App.tsx';
import RootLayout from './Components/RootLayout.tsx';
import RaceSearch from './Components/RaceSearch.tsx';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'search',
        element: <RaceSearch />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);