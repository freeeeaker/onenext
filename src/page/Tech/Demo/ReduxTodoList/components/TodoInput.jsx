import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Input from '@material-ui/core/Input'

import { addTodo } from '../action/todo'

export default
@connect(null,
function mapDispatchToProps (dispatch) {
  return {
    addTodo: value => dispatch(addTodo(value))
  }
})
class TodoInput extends PureComponent {
  constructor (props) {
    super()
    this.state = { value: props.value }
  }
  onChange = (ev) => {
    this.setState({ value: ev.target.value })
  }
  onKeyUp = (ev) => {
    if (ev.keyCode === 13 && !!ev.target.value) {
      this.setState({ value: '' })
      this.props.addTodo({ value: ev.target.value })
    }
  }
  render () {
    const { value } = this.state
    return (
      <Input
        fullWidth
        autoComplete="off"
        placeholder="input your todo item"
        value={value}
        onChange={this.onChange}
        onKeyUp={this.onKeyUp}
      />
    )
  }
}
