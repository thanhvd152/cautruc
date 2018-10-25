/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {

} from 'react-native';
import { Provider } from 'react-redux'
import AppContainer from './src/appContainer'
import store from './src/redux/store'
import api from './src/api'

export default class App extends Component {
  constructor(props) {
    super(props)
    api.setStore(store)
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}


