import React, { Component } from 'react'
import Layout from './common/layout'
import { Provider } from "react-redux";
import store from '../store';
import { Nav } from './common'

import '../styles/app.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Nav />
          <br />
          <div className="container">
            <Layout />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App