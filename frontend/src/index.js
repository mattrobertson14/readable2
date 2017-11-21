import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Root from './components/Root';
import reducer from './reducers';

const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);


ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'));
registerServiceWorker();
