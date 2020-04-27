import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reduser from '@/store/reduser';
import App from '@/store/containers/App';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reduser,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()// redux插件
);

if (1) {
  import('@/assets/css/cssmodule.css');
} else {
  import('@/assets/css/main.scss');
}


ReactDom.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);
