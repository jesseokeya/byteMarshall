import React, { Component } from 'react'
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from '../store';
import { Nav, Editor, Landing } from './common'

import '../styles/app.css'

const LandingPage = () => (
  <div>
    <Nav />
    <Landing />
  </div>
)

const ByteMarshallEditor = () => (
  <div>
    <Nav />
    <br />
    <div className="container">
      <Editor />
    </div>
  </div>
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/editor" component={ByteMarshallEditor} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App