import React, { createContext, useContext, useReducer } from 'react';
import {
  ReducerState,
  ProviderProps,
} from 'types';

const InitialState: ReducerState = {
  alert: false,
};
const Store = createContext();
const UseStateValue = () => useContext(Store);
const StateProvider = ({ reducers, initialState, children }: ProviderProps) => (
  <Store.Provider value={useReducer(reducers, initialState)}>
    {children}
  </Store.Provider>
);

export {
  InitialState,
  Store,
  StateProvider,
  UseStateValue,
};
