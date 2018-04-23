import {jsonResponse} from './data/db';
import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Title } from './components/App';
import {List} from './components/List'
import './index.css';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path="/" component={Title} />
        <Route path="/list" render={(props) => (<List source={jsonResponse}/>) } />
      </div>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker();