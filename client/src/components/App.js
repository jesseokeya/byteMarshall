import React, { Component } from 'react'
import { Provider } from 'react-redux';
import uid from 'unique-string';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from '../store';
import { Nav, Editor, Landing } from './common'

import '../styles/app.css'

const LandingPage = (props) => (
  <div>
    <Nav {...props}/>
    <Landing {...props}/>
  </div>
)

const ByteMarshallEditor = (props) => (
  <div>
    <Nav {...props}/>
    <br />
    <div className="container is-fluid">
      <Editor {...props}/>
    </div>
  </div>
)

class App extends Component {
  componentDidMount() {
    const session = localStorage.getItem('session')
    if (!session) {
      localStorage.setItem('session', uid())
    }
  }

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