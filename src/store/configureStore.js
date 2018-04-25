import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  ));