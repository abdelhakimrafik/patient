import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type RouteWrapperProps = {
  type?: 'private' | 'auth' | 'default';
};

export default function RouteWrapper({ type }: RouteWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { credentials } = useSelector((state) => (state as any).authState);

  useEffect(() => {
    if (!credentials && type === 'private') {
      navigate('/auth/login');
    } else if (credentials && type === 'auth') {
      navigate('/');
    }
    setIsLoading(false);
  }, [credentials, navigate, type]);

  // returns child route elements
  return !isLoading ? <Outlet /> : null;
}
