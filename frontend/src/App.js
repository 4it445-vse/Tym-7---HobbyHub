import React, {Component} from 'react';
import './App.css'
import {Router, applyRouterMiddleware, browserHistory} from 'react-router';
import {useScroll} from 'react-router-scroll';
import {createRoutes} from './createRoutes.js';

class App extends Component {
  render() {
    const routes = createRoutes();
    return (
      <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
        {routes}
      </Router>
    );
  }
}

export default App;
