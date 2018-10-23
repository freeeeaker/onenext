import React, { PureComponent } from 'react'
import { Route, withRouter, Switch } from 'react-router'
import { Motion, StaggeredMotion, TransitionMotion, spring, presets } from 'react-motion'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import MotionDemo from './MotionDemo/Index'
import StaggeredMotionDemo from './StaggeredMotionDemo/Index'
import TransitionMotionDemo from './TransitionMotion/Index'

export default

@withStyles({
  motion: {
    width: 100,
    height: 100,
    background: 'red',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: '100px',
    overflow: 'hidden',
    '&:nth-child(1)': {
      background: '#ef9a9a'
    },
    '&:nth-child(2)': {
      background: '#ce938d'
    },
    '&:nth-child(3)': {
      background: '#9fa8da'
    },
    '&:nth-child(4)': {
      background: '#81d4fa'
    },
    '&:nth-child(5)': {
      background: '#80cbc4'
    }
  },
  listItem: {
    background: '#000',
    color: '#fff',
    overflow: 'hidden',
    border: '1px solid #fff',
    '& span': {
      float: 'right',
      cursor: 'pointer'
    }
  }
})
@withRouter
class ReactMotion extends PureComponent {
  static displayName = 'react-motion'
  state = { activeTab: 0 }
  onChange = (event, index) => {
    this.setState({ activeTab: index })
    const path = this.props.match.path
    let url
    switch (index) {
      case 1:
        url = `${path}/motion`
        break
      case 2:
        url = `${path}/staggeredMotion`
        break
      case 3:
        url = `${path}/transitionMotion`
        break
      default:
        url = `${path}/`
    }
    this.props.history.push(url)
  }
  render () {
    console.log('render:')
    console.log(this.props)
    return (
      <React.Fragment>
        <h2 ref={ ref => this.h2 = ref }>React Motion Demo</h2>
        <Paper>
          <Tabs
            value={this.state.activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.onChange}
          >
            <Tab label="intro" />
            <Tab label="Motion" />
            <Tab label="StaggeredMotion" />
            <Tab label="TransitionMotion" />
          </Tabs>
        </Paper>

          <Route exact path="/tech/demo/ReactMotion/" render={() => <Home />} />
          <Route path="/tech/demo/ReactMotion/motion" component={MotionDemo} />
          <Route path="/tech/demo/ReactMotion/staggeredMotion" component={StaggeredMotionDemo} />
          <Route path="/tech/demo/ReactMotion/transitionMotion" component={TransitionMotionDemo} />

      </React.Fragment>
    )
  }
}

class Home extends PureComponent {
  render () {
    return (
      <div>
        <p>这里是 react-motion 动画库的一些 demo， react-motion 是一个 React 弹性动画库</p>
      </div>
    )
  }
}