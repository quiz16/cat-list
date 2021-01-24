/* eslint-disable no-tabs */
import React, { Reducer } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface Breed {
	id: string
	name: string
}

export interface Cat {
	id: string
	url: string
}

export interface HomeState {
  breedList: Breed
  catList: Cat
  page: number
  selectedBreed: string
  loadLabel: string
  isDisableLoad: boolean
  hideLoadBtn: boolean
}

export interface CatDetails extends Cat {
  name?: string
  origin?: string
  temperament?: string
  description?: string
}

export interface ReducerState {
  alert: boolean
}

export interface ProviderProps {
  reducers: Reducer
  initialState: ReducerState
  children: React.ComponentType<RouteComponentProps>
}
