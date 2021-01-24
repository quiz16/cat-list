import React from 'react';
import {
  Card,
  Button,
} from 'react-bootstrap';
import {
  CatDetails,
} from 'types';
import './styles.scss';

const CardComponent = (props: CatDetails) => {
  const {
    url,
    id,
    name,
    origin,
    temperament,
    description,
  } = props;

  const renderCard = () => {
    if (name) {
      return (
        <>
          <Card.Header><Button variant="primary" href={`/?breed=${id}`}>Back</Button></Card.Header>
          <Card.Img variant="top" src={url} />
          <Card.Body>
            <h4>{name}</h4>
            <h5>Origin: {origin}</h5>
            <h6>{temperament}</h6>
            <p>{description}</p>
          </Card.Body>
        </>
      );
    }
    return (
      <>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Button variant="primary" block href={`/${id}`}>View details</Button>
        </Card.Body>
      </>
    );
  };

  return (
    <Card>
      {renderCard()}
    </Card>
  );
};

export default CardComponent;
