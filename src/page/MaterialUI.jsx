import React, { PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'

export default class MaterialUI extends PureComponent {
  render () {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={6}>1</Grid>
          <Grid item xs={6}>2</Grid>
        </Grid>
      </div>
    )
  }
}