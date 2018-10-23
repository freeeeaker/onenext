import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import {
  withProps,
  mapProps,
  compose,
  renameProp,
  renameProps,
  flattenProp,
  withState,
  withHandlers
} from 'recompose'

import Input from '@material-ui/core/Input'

export default
@withRouter
@mapProps(function (props) {
  return { oldKey: 'heiheihei', obj: { x: { g: 99 }, y: 1 } }
})
@withProps(function (props) {
  return { a: 1, b: 2 }
})
@renameProp('oldKey', 'newKey')
@renameProps({
  a: 'z'
})
@flattenProp('obj')
@withState('list', 'updateState', [])
class RecomposeDemo extends PureComponent {
  static displayName = 'recompose'
  constructor () {
    super()
    this.state = { valueList: [ 0, 0, 0 ] }
  }
  updateState = (newValue, cb) => {
    cb(newValue) 
  }
  updateValue1 = value => {
    const v2 = this.state.valueList[1]
    this.setState({ valueList: [value, v2, value + v2] })
  }
  updateValue2 = value => {
    const v1 = this.state.valueList[0]
    this.setState({ valueList: [v1, value, value + v1] })
  }
  updateValue3 = value => {}
  onSubmit = (ev) => {
    ev.preventDefault()
    console.log(ev.target.value)
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <div>
          <AddInput ref={ref=> this.n1 = ref} updateValue={this.updateValue1} />
          +
          <AddInput ref={ref=> this.n2 = ref} updateValue={this.updateValue2} />
          =
          <AddInput ref={ref=> this.n2 = ref} updateValue={this.updateValue3} disabled />
          </div>
          <form onSubmit={this.onSubmit}>
            <input name="value" defaultValue="123" />
            <button type="submit">submit</button>
          </form>
      </div>
    )
  }
}

// @withState('value', 'updateValue', '')
@withHandlers({
  onChange: props => ev => {
    console.log(props, ev)
    props.updateValue(ev.target.value)
  }
})
class AddInput extends PureComponent {
  constructor () {
    super()
    this.state = { value: '' }
  }
  // onChange = (ev) => {
  //   this.setState({ value: ev.target.value })
  // }
  // getValue () {
  //   return this.state.value
  // }
  render () {
    // const { value } = this.state
    const { disabled, value } = this.props
    return <Input value={value} disabled={disabled} onChange={this.props.onChange} />
  }
}

