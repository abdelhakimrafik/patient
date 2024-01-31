import { lazy } from 'react';
import Layout from './Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';

/**
 * Public pages
 */
const Login = lazy(() => import('./pages/Login'));

/**
 * Private pages
 */
const PatientsList = lazy(() => import('./pages/Patients/PatientsList'));
const PatientPreview = lazy(() => import('./pages/Patients/PatientPreview'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout fill />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <PatientsList />,
      },
      {
        path: '/patients/preview/:id',
        element: <PatientPreview />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
