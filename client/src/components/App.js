import React, { Component } from 'react'
import Layout from './common/layout'
import { Nav } from './common'

import '../styles/app.css'

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <br />
        <div className="container">
          <Layout />
        </div>
      </div>
    )
  }
}

export default App