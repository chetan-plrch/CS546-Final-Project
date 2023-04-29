import { Route, Navigate } from 'react-router-dom';

function CustomRoute(props) {
  const { directAccessNotAllowed, ...rest } = props;
  const shouldRedirect = directAccessNotAllowed && window.performance.navigation.type === 1;

  if (shouldRedirect) {
    return <Navigate to="/feedbackslist" />;
  } else {
    return <Route {...rest} />;
  }
}

export default CustomRoute;