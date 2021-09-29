import React, { createContext, useReducer } from 'react';

const initialState = { currentFilters: [] };
export const FilterContext = createContext(initialState.currentFilters);

function reducer(state, action) {
  switch (action.type) {
    case 'setCurrentFilters':
      return { currentFilters: action.payload };
    default:
      return state;
  }
}

export const FilterContextProvider = ({ children }) => {
  const { Provider } = FilterContext;
  return <Provider value={useReducer(reducer, initialState)}>{children}</Provider>;
};
