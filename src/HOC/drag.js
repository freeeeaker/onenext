import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'

export default function drag(WrapedComponent) {
  return class extends PureComponent {
    constructor () {
      super()
      this.state = { x: null, y: null }
    }
    componentDidMount () {
      this.node = findDOMNode(this)
      this.node.addEventListener('mousedown', this.down)
    }
    componentWillUnmount () {
      if (this.node) this.node.removeEventListener('mousedown', this.down)
    }
    down = ev => {
      this.x = ev.clientX
      this.y = ev.clientY
      document.addEventListener('mousemove', this.move)
      document.addEventListener('mouseup', this.up)
    }
    move = ev => {
      this.setState({ x: ev.clientX - this.x, y: ev.clientY - this.y })
    }
    up = ev => {
      document.removeEventListener('mousemove', this.move)
      document.removeEventListener('mouseup', this.up)
    }
    render () {
      const { x, y } = this.state
      return <WrapedComponent {...this.props} left={`${x}px`} top={`${y}px`} />
    }
  }
}