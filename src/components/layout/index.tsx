import React from 'react';
import {
  Container,
} from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import './styles.scss';

const Layout = (
  Component: React.ComponentType<RouteComponentProps>,
) => (props: RouteComponentProps) => (
  <div className="app">
    <Container>
      <Component {...props} />
    </Container>
  </div>
);

export default Layout;
