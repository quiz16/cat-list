import React from 'react';
import {
  Container,
  Alert,
} from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { UseStateValue } from 'provider';
import './styles.scss';

const Layout = (
  Component: React.ComponentType<RouteComponentProps>,
) => (props: RouteComponentProps) => {
  const [{ alert }] = UseStateValue();

  /* render alert component */
  const renderAlert = () => (
    <Alert variant="danger">
      Apologies but we could not load new cats for you at this time! Miau!
    </Alert>
  );
  return (
    <div className="app">
      <Container>
        {alert && renderAlert()}
        <Component {...props} />
      </Container>
    </div>
  );
};

export default Layout;
