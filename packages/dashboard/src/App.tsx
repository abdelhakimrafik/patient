import { Suspense, lazy } from 'react';
import Layout from './Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
const PatientAdd = lazy(() => import('./pages/Patients/PatientAdd'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Layout />}>
        <Routes>
          <Route path="/auth" element={<Layout />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<Layout fill />}>
            <Route path="/" element={<PatientsList />} />
            <Route path="/patients/preview/:id" element={<PatientPreview />} />
            <Route path="/patients/add" element={<PatientAdd />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
