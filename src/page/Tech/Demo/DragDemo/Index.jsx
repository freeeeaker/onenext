import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import drag from '@hoc/drag'

export default
class DragDemo extends PureComponent {
  static displayName = 'Drag HOC'
  render () {
    return (
      <div>
       <Ball />
      </div>
    )
  }
}


@drag
@withStyles({
  ball: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: '50%',
    background: 'red'
  }
})
class Ball extends PureComponent {
  render () {
    const { left, top } = this.props
    return <div className={this.props.classes.ball} style={{ left, top }} />
  }
}