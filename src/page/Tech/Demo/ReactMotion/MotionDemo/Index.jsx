import React, { PureComponent } from 'react'
import { Motion, spring, presets } from 'react-motion'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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
})
class MotionDemo extends PureComponent {
  constructor () {
    super()
    this.state = {
      motionKey: Math.random(),
      motionRun: false,
      StaggeredMotionKey: Math.random(),
      width: 0,
      value: '',
      list: [{ key: 't-' + Math.random(), value: 123, width: 0 }]
    }
  }
  componentDidMount () {
    this.setState({ width: this.box.getBoundingClientRect().width - 100 })
  }
  render () {
    const { motionRun, motionKey, width } = this.state
    const { classes } = this.props
    return (
      <div ref={ref => this.box = ref}>
        <h3>Motion Demo</h3>
        <Button variant="contained" color="primary" onClick={ () => this.setState({ motionKey: Math.random(), motionRun: true }) }>start</Button>
        <Motion
          key={ motionKey }
          defaultStyle={{x: 0, y: 0, z: 0, g: 0, h: 0}}
          style={{
            x: spring(width, presets.wobbly),
            y: spring(width, presets.gentle),
            z: spring(width, presets.stiff),
            g: spring(width, presets.noWobble)
          }}
          // onRest={ () => { this.setState({ motionRun: false }) } }
        >
        { 
          value => (
            <React.Fragment>
              <div key="m1" className={ classes.motion } style={{ transform: motionRun ? `translate(${value.g}px, 0)` : 'none' }} >default</div>
              <div key="m3" className={ classes.motion } style={{ transform: motionRun ? `translate(${value.x}px, 0)` : 'none' }} >wobbly</div>
              <div key="m4" className={ classes.motion } style={{ transform: motionRun ? `translate(${value.y}px, 0)` : 'none' }} >stiff</div>
              <div key="m5" className={ classes.motion } style={{ transform: motionRun ? `translate(${value.z}px, 0)` : 'none' }} >noWobble</div>
            </React.Fragment>
          )
        }
        </Motion>
      </div>
    )
  }
}