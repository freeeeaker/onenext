import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { clearAllTodos, clearSelectedTodos } from '../action/todo'
import { setVisibility } from '../action/visibility'

export default
@connect(({ visibility }) => {
  return { visibility }
}, dispatch => {
  return {
    setVisibility: visibility => dispatch(setVisibility(visibility)),
    clearSelectedTodos: () => dispatch(clearSelectedTodos()),
    clearAllTodos: () => dispatch(clearAllTodos())
  }
})
@withStyles({
  tfoot: {
    marginTop: 10
  }
})
class Footer extends PureComponent {
  render () {
    const { classes } = this.props
    return (
      <Grid container justify='space-between' className={classes.tfoot}>
        <Grid item>
          <Button onClick={ () => this.props.clearSelectedTodos()} >clear selected</Button>
          <Button onClick={ () => this.props.clearAllTodos() }>clear All</Button>
        </Grid>
        <Grid item>
          <Button onClick={() => this.props.setVisibility('ALL')}>ALL</Button>
          <Button onClick={() => this.props.setVisibility('COMPLETE')}>COMPLETE</Button>
          <Button onClick={() => this.props.setVisibility('ACTIVE')}>ACTIVE</Button>
        </Grid>
      </Grid>
    )
  }
}