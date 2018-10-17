import React, { PureComponent } from 'react'
import { Motion, StaggeredMotion, TransitionMotion, spring, presets } from 'react-motion'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'


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
class ReactMotion extends PureComponent {
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
    this.heights = []
  }
  componentDidMount () {
    this.setState({ width: this.h2.getBoundingClientRect().width - 100 })
    this.heights = this.getHeights()
  }
  componentDidUpdate () {
    this.heights = this.getHeights()
  }
  componentDidCatch (error) {
    console.log(error)
  }
  willEnter = (styleThatEntered) => {

    return { height: 0, opacity: 0 }
  }
  willLeave = () => {
    return { height: spring(0), opacity: spring(0) }
  }
  onChange = (ev) => {
    this.setState({ value: ev.target.value })
  }
  onKeyUp = (ev) => {
    if (ev.keyCode === 13) {
      this.setState({ list: [ { value: this.state.value, key: 't-' + Math.random(), width: 0 },  ...this.state.list ] })
    }
  }
  getHeights = () => {
    const heights = []
    for (let i = 0; i < this.$list.children; i++) {
      heights.push(this.$list.children[i].querySelector('.list-item').offsetHeight)
    }
    return heights
  }
  getStyles = () => {
    return this.state.list.map((item, index) => ({ key: item.key, style: { height: spring(40, presets.gentle), opacity: spring(1, presets.stiff) }, data: item }))
  }
  remove = (key) => {
    for (let i = 0; i < this.state.list.length; i++) {
      console.log(this.state.list[i].key, key)
      if (this.state.list[i].key == key) {
        console.log('remove:', i)
        this.setState({ list: [ ...this.state.list.slice(0, i), ...this.state.list.slice(i+1)] })
        break
      }
    }
  }
  render () {
    const { motionRun, motionKey, width, StaggeredMotionKey, value, list } = this.state
    const { classes } = this.props
    
    return (
      <React.Fragment>
        <h2 ref={ ref => this.h2 = ref }>React Motion Demo</h2>
        <div>
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
        <div>
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
        <div>
          <h3>TransitionMotion Demo</h3>
          <Input
            fullWidth
            autoComplete="off"
            placeholder="input your todo item"
            value={value}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
          <TransitionMotion
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            defaultStyles={ list.map(item => ({ ...item, style: { height: 0, opacity: 0 } })) }
            styles={this.getStyles()}
          >
          {
            interpolatedStyles =>
              // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
              <ul ref={ ref => this.$list = ref }>
                {
                  interpolatedStyles.map(config => {
                    return (
                      <li key={config.key} data-key={config.key} className={classes.listItem} style={{height: config.style.height + 'px', opacity: config.style.opacity }}>
                        <div className="list-item">{config.data.value}<span onClick={() => this.remove(config.key)}>REMOVE</span></div>
                      </li>
                    )
                  })
                }
              </ul>
          }
          </TransitionMotion>
        </div>
      </React.Fragment>
    )
  }
}