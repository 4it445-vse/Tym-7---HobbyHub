import React, {Component} from 'react';
import { Provider } from 'react-redux'
import {Router, applyRouterMiddleware, browserHistory} from 'react-router';
import {useScroll} from 'react-router-scroll';


import '../public/css/bootstrap.min.css';
import '../public/css/font-awesome.min.css';
import '../public/css/animate.min.css';
import '../public/css/prettyPhoto.css';
import '../public/css/main.css';
import '../public/css/responsive.css';
import '../public/css/custom-main.css';

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
