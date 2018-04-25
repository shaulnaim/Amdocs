import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Title } from './components/App';
import CardsList from './components/CardsList';
import configureStore from './store/configureStore';
import './index.css';

ReactDOM.render(
  <Provider store={configureStore}>
    <Router>
      <div>
        <Route exact path="/" component={Title} />
        <Route path="/cards-list" component={CardsList} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
