import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { fetchCatById } from 'services/cat';
import Card from 'components/card';
import { UseStateValue } from 'provider';
import Constants from 'constants';
import {
  CatDetails,
} from 'types';

const Details = (props: RouteComponentProps) => {
  const { match: { params: { id } } } = props;
  const [catDetails, setCatDetails] = useState<CatDetails>({});
  const [, dispatch] = UseStateValue();

  /* trigger dispatch to toggle alert */
  const triggerAlert = (value: boolean) => dispatch({
    type: Constants.TOGGLE_ALERT,
    payload: value,
  });
  /* fetch details for selected cat */
  const fetchCat = async () => {
    try {
      const { data } = await fetchCatById(id);
      const [breed] = data.breeds;
      setCatDetails({
        url: data.url,
        id: breed.id,
        name: breed.name,
        origin: breed.origin,
        temperament: breed.temperament,
        description: breed.description,
      });
      triggerAlert(false);
    } catch (e) {
      triggerAlert(true);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <Card {...catDetails} />
  );
};

export default Details;
