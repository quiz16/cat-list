import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import {
  fetchBreed,
  search,
} from 'services/cat';
import Card from 'components/card';
import {
  Breed,
  Cat,
} from 'types';
import './styles.scss';

const { REACT_APP_SEARCH_LIMIT: LIMIT } = process.env;

const Home = (props: RouteComponentProps) => {
  const [breedList, setBreedList] = useState<Breed[]>([]);
  const [catList, setCatList] = useState<Cat[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedBreed, setSelectedBreed] = useState<string>('noop');

  const fetchBreedList = async () => {
    try {
      const breedResult = await fetchBreed();
      setBreedList(breedResult.map(({ name, id }: Breed) => ({ name, id })));
    } catch (e) {
      console.log(e);
    }
  };

  const searchCats = async (value: string) => {
    try {
      const searchResult = await search({
        limit: LIMIT,
        breed_id: value,
        page,
      });
      setCatList(searchResult.map(({ id, url }: Cat) => ({ id, url })));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBreedList();
  }, []);

  const renderBreedList = () => breedList.map(
    ({ name, id }: Breed) => (
      <option key={id} value={id}>{name}</option>
    ),
  );

  const renderCatList = () => catList.map(
    (cat: Cat) => (
      <Card {...cat} />
    ),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCatList([]);
    setSelectedBreed(value);
    if (value !== 'noop') {
      searchCats(value);
    }
  };

  return (
    <div className="home">
      <h1>Cat Browser</h1>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Breed</Form.Label>
        <Form.Control as="select" onChange={handleInputChange}>
          <option value="noop">Select breed</option>
          { renderBreedList() }
        </Form.Control>
      </Form.Group>
      <Row>
        { renderCatList() }
        { !catList.length && (<Col xs="12">No cats available</Col>)}
      </Row>
    </div>
  );
};

export default Home;
