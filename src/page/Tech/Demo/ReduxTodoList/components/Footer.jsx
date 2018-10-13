import React, { PureComponent } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export default
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
          <Button onClick={this.clearSelected} >clear selected</Button>
          <Button onClick={ () => this.setState({ todoList: [] }) }>clear All</Button>
        </Grid>
        <Grid item>
          <Button onClick={() => this.showTodos('all')}>All</Button>
          <Button onClick={() => this.showTodos('done')}>done</Button>
          <Button onClick={() => this.showTodos('todo')}>todo</Button>
        </Grid>
      </Grid>
    )
  }
}