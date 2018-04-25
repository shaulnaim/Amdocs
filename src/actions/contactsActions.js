import * as types from './actionTypes';
import { jsonResponse } from '../data/db';

const receiveContacts = json => {
  return { type: types.RECEIVE_CONTACTS, contacts: jsonResponse.people };
};

export const dispatchToggleModal = isOpen => {
  return { type: types.TOGGLE_MODAL, isOpen: isOpen };
};

export const dispatchUpdateSelected = selectedObj => {
  return { type: types.UPDATE_SELECTED, selected: selectedObj };
};

export const dispatchEditAge = updatedAgeObj => {
  return { type: types.UPDATE_AGE, age: updatedAgeObj };
};

export const dispatchEditCity = updatedCityObj => {
  return { type: types.UPDATE_CITY, city: updatedCityObj };
};

export const dispatchEditName = updatedNameObj => {
  return { type: types.UPDATE_NAME, name: updatedNameObj };
};

export const dispatchSearch = term => {
  return { type: types.APPLY_SEARCH, search: term };
};

export const getContacts = () => {
  return dispatch => {
    dispatch(receiveContacts(jsonResponse));
  };
};



