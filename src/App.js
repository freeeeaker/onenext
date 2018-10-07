import React, { Component, Fragment } from 'react';
import Header from '@view/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Route } from 'react-router'
import MaterialUI from '@page/MaterialUI'
import About from '@page/About'
import Life from '@page/Life'
import Tech from '@page/Tech/Tech'
class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
          <Header />
          <Route exact path="/material-ui" component={MaterialUI}></Route>
          <Route exact path="/life" component={Life}></Route>
          <Route path="/tech" component={Tech}></Route>
          <Route exact path="/about" component={About}></Route>
      </Fragment>
    );
  }
}

export default App;
