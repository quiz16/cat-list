import React from 'react';
import {
  Col,
  Card,
  Button,
} from 'react-bootstrap';
import {
  Cat,
} from 'types';
import './styles.scss';

const CardComponent = ({ url, id }: Cat) => (
  <Col md="3" sm="6" xs="12">
    <Card>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Button variant="primary" block href={`/${id}`}>View details</Button>
      </Card.Body>
    </Card>
  </Col>
);

export default CardComponent;
