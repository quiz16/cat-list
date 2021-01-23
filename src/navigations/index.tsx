import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from 'components/layout';
import Home from 'containers/home';
import Details from 'containers/details';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Layout(Home)} />
      <Route exact path="/:id" component={Layout(Details)} />
    </Switch>
  </BrowserRouter>
);
