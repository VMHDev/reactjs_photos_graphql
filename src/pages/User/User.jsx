import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

// Constants
import {
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_ACCOUNT,
  PATH_CHANGEPASSWORD,
  PATH_FORGOTPASSWORD,
  PATH_RESETPASSWORD,
  PATH_NOTFOUND,
  PATH_PERMISSION,
} from '../../constants/route';

// Lazy load Components page
const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Account = React.lazy(() => import('./pages/Account/Account'));
const ForgotPassword = React.lazy(() =>
  import('./pages/ForgotPassword/ForgotPassword')
);
const ResetPassword = React.lazy(() =>
  import('./pages/ResetPassword/ResetPassword')
);
const ChangePassword = React.lazy(() =>
  import('./pages/ChangePassword/ChangePassword')
);
const Permission = React.lazy(() => import('./pages/Permission/Permission'));

// Main
const User = (props) => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url}>
        <Redirect to={match.url + PATH_LOGIN} />
      </Route>
      <Route path={match.url + PATH_LOGIN} component={Login} />
      <Route path={match.url + PATH_REGISTER} component={Register} />
      <Route path={match.url + PATH_ACCOUNT} component={Account} />
      <Route path={match.url + PATH_PERMISSION} component={Permission} />
      <Route
        path={match.url + PATH_CHANGEPASSWORD}
        component={ChangePassword}
      />
      <Route
        path={match.url + PATH_FORGOTPASSWORD}
        component={ForgotPassword}
      />
      <Redirect
        exact
        from={match.url + PATH_RESETPASSWORD}
        to={PATH_NOTFOUND}
      />
      <Route
        path={`${match.url + PATH_RESETPASSWORD}:token`}
        component={ResetPassword}
      />
    </Switch>
  );
};

User.propTypes = {};

export default User;
