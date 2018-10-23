import React, { PureComponent } from 'react'
import { StaggeredMotion, spring, presets } from 'react-motion'

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
      StaggeredMotionKey: Math.random(),
      width: 0
    }
  }
  componentDidMount () {
    this.setState({ width: this.box.getBoundingClientRect().width - 100 })
  }
  render () {
    const { StaggeredMotionKey, width } = this.state
    const { classes } = this.props
    return (
      <div ref={ref => this.box = ref}>
          <h3>StaggeredMotion Demo</h3>
          <Button variant="contained" color="primary" onClick={ () => this.setState({ StaggeredMotionKey: Math.random(), StaggeredMotionRun: true }) }>start</Button>
          <StaggeredMotion
            key={ StaggeredMotionKey }
            defaultStyles={ [{ x: 0 }, { x: 0 }, { x: 0 }, { x: 0 } ]}
            styles={
              prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => { return { x: spring(i === 0 ? width : prevInterpolatedStyles[i - 1].x, presets.stiff) } } )
            }
            // onRest={ () => { this.setState({ motionRun: false }) } }
          >
          {
            prevInterpolatedStyles => {
              return (
                <React.Fragment>
                  {
                    prevInterpolatedStyles.map((style, i) => {
                      return <div key={i} className={ classes.motion } style={{ transform: `translate(${style.x}px, 0)` }} />
                    })
                  }
                </React.Fragment>
              )
            }
          }
          </StaggeredMotion>
        </div>
    )
  }
}