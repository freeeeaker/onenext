import React, { PureComponent } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'

import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'


export default
@withStyles({
  listItem: {
    background: '#000',
    color: '#fff',
    overflow: 'hidden',
    border: '1px solid #fff',
    lineHeight: '40px',
    paddibng: '0 10px',
    '& span': {
      float: 'right',
      cursor: 'pointer',
      height: '100%'
    }
  }
})
class MotionDemo extends PureComponent {
  constructor () {
    super()
    this.state = {
      value: '',
      list: [{ key: 't-' + Math.random(), value: 123, width: 0 }]
    }
  }
  componentDidMount () {
    this.setState({ width: this.box.getBoundingClientRect().width - 100 })
    this.heights = this.getHeights()
  }
  componentDidUpdate () {
    this.heights = this.getHeights()
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
    const { value, list } = this.state
    const { classes } = this.props
    return (
      <div ref={ref => this.box = ref}>
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
    )
  }
}