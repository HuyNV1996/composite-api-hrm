import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteProps, useLocation } from 'react-router';

import useLocalStorage from '@/hooks/useLocalStorage';

const PrivateRoute: FC<RouteProps> = props => {
  const { storedValue: token } = useLocalStorage('token');
  const location = useLocation();
  return token && location.pathname !== 'register' ? (
    (props.element as React.ReactElement)
  ) : (
    <Navigate
      to={`/login${'?from=' + encodeURIComponent(location.pathname)}`}
    />
  );
};

export default PrivateRoute;
