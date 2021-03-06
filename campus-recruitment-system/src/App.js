import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Routers from './Route'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
