import { Suspense, lazy } from 'react';
import Layout from './Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import RouteWrapper from './components/RouteWrapper';

/**
 * Public pages
 */
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

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
          <Route path="/auth" element={<RouteWrapper type="auth" />}>
            <Route element={<Layout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Route>
          <Route path="/" element={<RouteWrapper type="private" />}>
            <Route path="/" element={<Layout fill />}>
              <Route path="/" element={<PatientsList />} />
              <Route
                path="/patients/preview/:id"
                element={<PatientPreview />}
              />
              <Route path="/patients/add" element={<PatientAdd />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
