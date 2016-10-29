import React, {Component} from 'react';
import { Provider } from 'react-redux'
import {Router, applyRouterMiddleware, browserHistory} from 'react-router';
import {useScroll} from 'react-router-scroll';


import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/animate.min.css';
import './css/prettyPhoto.css';
import './css/main.css';
import './css/responsive.css';
import './App.css';

import {createRoutes} from './createRoutes.js';

class App extends Component {
  render() {
    const { store } = this.props;
    const routes = createRoutes();
    return (
        <Provider store={store}>
          <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
            {routes}
          </Router>
        </Provider>
    );
  }
}

export default App;
