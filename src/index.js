import React from 'react';
import ReactDOM from 'react-dom';
import * as react_router_dom from 'react-router-dom'
import * as react_router from 'react-router'
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <react_router_dom.BrowserRouter>
    <App />
  </react_router_dom.BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
console.log(react_router)
console.log(react_router_dom)