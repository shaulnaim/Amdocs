import {
  GET_CONTACTS,
  RECEIVE_CONTACTS,
  TOGGLE_MODAL,
  APPLY_SEARCH,
  UPDATE_SELECTED,
  UPDATE_CITY,
  UPDATE_NAME,
  UPDATE_AGE
} from '../actions/actionTypes';

let initialState = {
  contacts: [],
  isOpen: false,
  search: '',
  selected: {
    id: 2,
    age: 24,
    name: 'placeholder',
    location: {
      address: ' 25 Happy st',
      city: 'Ashdod',
      country: 'Israel'
    },
    representative: 'shir'
  }
};

export default function contacts(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_CONTACTS:
      return action;
    case RECEIVE_CONTACTS:
      newState = action.contacts;
      return { ...state, contacts: newState };
    case TOGGLE_MODAL:
      newState = action.isOpen;
      return { ...state, isOpen: newState };
    case UPDATE_SELECTED:
      newState = action.selected;
      return { ...state, selected: newState };
    case UPDATE_AGE:
      newState = action.age;
      const updateSelectedAge = {
        ...state,
        selected: {
          ...state.selected,
          age: newState
        }
      };
      const updatedContactAge = state.contacts.map(obj => {
        return obj.id === updateSelectedAge.selected.id
          ? { ...obj, ...updateSelectedAge.selected }
          : obj;
      });
      return { ...state, contacts: updatedContactAge };
    case UPDATE_CITY:
      newState = action.city;
      const updateSelectedCity = {
        ...state,
        selected: {
          ...state.selected,
          location: {
            ...state.selected.location,
            city: newState
          }
        }
      };
      const updatedContactCity = state.contacts.map(obj => {
        return obj.id === updateSelectedCity.selected.id
          ? { ...obj, ...updateSelectedCity.selected }
          : obj;
      });
      return { ...state, contacts: updatedContactCity };
    case UPDATE_NAME:
      newState = action.name;
      const updateSelectedName = {
        ...state,
        selected: {
          ...state.selected,
          name: newState
        }
      };
      const updatedContactName = state.contacts.map(obj => {
        return obj.id === updateSelectedName.selected.id
          ? { ...obj, ...updateSelectedName.selected }
          : obj;
      });
      return { ...state, contacts: updatedContactName };
    case APPLY_SEARCH:
      newState = action.search;
      return { ...state, search: newState };
    default:
      return state;
  }
}
