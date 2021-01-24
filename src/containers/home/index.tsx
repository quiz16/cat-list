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
  HomeState,
} from 'types';
import { UseStateValue } from 'provider';
import Constants from 'constants';
import './styles.scss';

const { REACT_APP_SEARCH_LIMIT: LIMIT } = process.env;

const initialState = {
  catList: [],
  page: 1,
  selectedBreed: 'noop',
  loadLabel: 'Load more',
  isDisableLoad: true,
  hideLoadBtn: false,
};

const Home = (props: RouteComponentProps) => {
  const { location: { search: searchParams } } = props;
  const [{
    breedList,
    catList,
    page,
    selectedBreed,
    loadLabel,
    isDisableLoad,
    hideLoadBtn,
  }, setState] = useState<HomeState>({
    ...initialState,
    breedList: [], // not included in initialState to prevent reset after selecting new breed
  });
  const [, dispatch] = UseStateValue();
  /* trigger dispatch to toggle alert */
  const triggerAlert = (value: boolean) => dispatch({
    type: Constants.TOGGLE_ALERT,
    payload: value,
  });

  /* reset states to initialState */
  const resetStates = () => setState((prevState: HomeState) => ({
    ...prevState,
    ...initialState,
  }));

  /* Fetch list of breed for the dropdown */
  const fetchBreedList = async () => {
    try {
      const breedResult = await fetchBreed();
      setState((prevState: HomeState) => ({
        ...prevState,
        breedList: breedResult.data.map(({ name, id }: Breed) => ({ name, id })),
      }));
      triggerAlert(false);
    } catch (e) {
      triggerAlert(true);
    }
  };

  /* Search for images base from selected breed */
  const searchCats = async (
    value: string,
    pageValue: number,
    catValue: Cat[],
    hideBtnValue: boolean,
  ) => {
    try {
      setState((prevState: HomeState) => ({
        ...prevState,
        page: pageValue,
        loadLabel: 'Loading cats...',
      }));
      const { headers, data } = await search({
        limit: LIMIT,
        breed_id: value,
        page: pageValue,
      });
      const allowedCount = headers['pagination-count'] - catValue.length;
      let listResult = catValue;
      let hideBtn = hideBtnValue;
      /* check how many values allowed to be render in card */
      if (allowedCount > 0) {
        const sliceResult = data.slice(0, allowedCount);
        listResult = [...listResult, ...sliceResult.map(({ id, url }: Cat) => ({ id, url }))];
      } else if (allowedCount <= 0 && pageValue !== 1) {
        /* hide the button if user request another search */
        hideBtn = true;
      }
      setState((prevState: HomeState) => ({
        ...prevState,
        hideLoadBtn: hideBtn,
        catList: listResult,
        loadLabel: 'Load more',
        isDisableLoad: false,
      }));
      triggerAlert(false);
    } catch (e) {
      triggerAlert(true);
    }
  };

  /* query list of breed on first render */
  useEffect(() => {
    fetchBreedList();
  }, []);

  useEffect(() => {
    if (searchParams) {
      const [, breedParam] = searchParams.split('?breed=');
      setupSearchTrigger(breedParam);
    }
  }, [searchParams]);

  /* render option for list of breed */
  const renderBreedList = () => breedList.map(
    ({ name, id }: Breed) => (
      <option key={id} value={id}>{name}</option>
    ),
  );

  /* render card for list of cats */
  const renderCatList = () => catList.map(
    (cat: Cat, index: number) => (
      <Col md="3" sm="6" xs="12" key={index}>
        <Card {...cat} />
      </Col>
    ),
  );

  /* prepares states before searching */
  const setupSearchTrigger = (value: string) => {
    resetStates();
    setState((prevState: HomeState) => ({
      ...prevState,
      selectedBreed: value,
    }));
    /* prevent search if selected breed is the placeholder */
    if (value !== 'noop') {
      searchCats(value, 1, [], false);
    }
  };

  /* capture changes from input/dropdown */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setupSearchTrigger(e.target.value);

  /* handle the button click load more */
  const loadMore = () => {
    const pageNow = page + 1;
    searchCats(selectedBreed, pageNow, catList, hideLoadBtn);
    setState((prevState: HomeState) => ({
      ...prevState,
      isDisableLoad: true,
    }));
  };

  return (
    <div className="home">
      <h1>Cat Browser</h1>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Breed</Form.Label>
        <Form.Control as="select" onChange={handleInputChange} value={selectedBreed}>
          <option value="noop">Select breed</option>
          { renderBreedList() }
        </Form.Control>
      </Form.Group>
      <Row>
        { renderCatList() }
        { !catList.length && (<Col xs="12" className="no-cats">No cats available</Col>) }
      </Row>
      <Row>
        <Col md="3" sm="6" xs="12">
          { !hideLoadBtn && (<Button variant="success" disabled={isDisableLoad} onClick={loadMore}>{ loadLabel }</Button>) }
        </Col>
      </Row>
    </div>
  );
};

export default Home;
