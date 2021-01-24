import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { fetchCatById } from 'services/cat';
import Card from 'components/card';
import {
  CatDetails,
} from 'types';

const Details = (props: RouteComponentProps) => {
  const { match: { params: { id } } } = props;
  const [catDetails, setCatDetails] = useState<CatDetails>({});
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
    } catch (e) {
      console.log(e);
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
