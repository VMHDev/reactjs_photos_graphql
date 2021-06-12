import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import NotFound from '../../components/NotFound';

// Constants
import { PATH_CATEGORY_ADD } from '../../constants/route';

// Lazy load Components page
const AddEditPage = React.lazy(() => import('./pages/AddEditPage/AddEditPage'));
const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));

// Main
const Category = (props) => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />

      <Route path={match.url + PATH_CATEGORY_ADD} component={AddEditPage} />
      <Route path={`${match.url}/:categoryId`} component={AddEditPage} />

      <Route component={NotFound} />
    </Switch>
  );
};

Category.propTypes = {};

export default Category;
