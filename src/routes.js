import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './pages/Main/index';
import Repository from './pages/Repository/index';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository/:name" component={Repository} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
