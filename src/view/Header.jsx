/* eslint-disable */
import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { withRouter } from 'react-router'

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import KeyboardIcon from '@material-ui/icons/Keyboard'
import HomeIcon from '@material-ui/icons/Home'
import FaceIcon from '@material-ui/icons/Face'
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast'

export default 
@withRouter
@withStyles({
  root: {
    height: '60px'
  },
  container: {
    height: '100%',
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  grow: {
    flexGrow: 1
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftIcon: {
    marginRight: 4
  },
  logo: {
    cursor: 'pointer'
  }
})
class Header extends PureComponent {
  navigateTo = link => {
    this.props.history.push(link)
  }
  render() {
    const { classes } = this.props
    return (
      <AppBar className = { classes.root } position="static" color="primary">
          <Grid container className={classnames(classes.container)}>
            <Grid item className={classes.center}>
              <Typography variant="display1" className={classes.logo} onClick={() => this.navigateTo('/')}>OneNext</Typography>
            </Grid>
            <Grid item className={classes.grow} />
            <Grid item className={classes.center}>
              <Button onClick={() => this.navigateTo('/')}><HomeIcon className={classes.leftIcon} />Home</Button>
            </Grid>
            <Grid item className={classes.center}>
              <Button onClick={() => this.navigateTo('/tech')}><KeyboardIcon className={classes.leftIcon} />Tech</Button>
            </Grid>
            <Grid item className={classes.center}>
              <Button onClick={() => this.navigateTo('/life')}><FreeBreakfastIcon className={classes.leftIcon} />Life</Button>
            </Grid>
            <Grid item className={classes.center}>
              <Button onClick={() => this.navigateTo('/about')}><FaceIcon className={classes.leftIcon} />Me</Button>
            </Grid>
          </Grid>
      </AppBar>
    )
  }
}