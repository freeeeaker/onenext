import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import { updateTodo, removeTodo } from '../action/todo'

export default
@connect(
null,
function mapDispatchToProps (dispatch) {
  return {
    updateTodo: state => dispatch(updateTodo(state)),
    removeTodo: id => dispatch(removeTodo(id))
  }
})
@withStyles({
})
class Todo extends PureComponent {
  constructor (props) {
    super()
    this.state = { value: props.value, checked: props.select }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ checked: nextProps.select })
  }
  editTodo = id => {
    this.props.updateTodo({ id, edit: true })
  }
  onChangeInput = ev => {
    this.setState({ value: ev.target.value })
  }
  modifyTodo = (ev, id) => {
    if ((ev.type === 'keyup' && ev.keyCode === 13) || ev.type === 'blur') {
      this.props.updateTodo({ id, value: ev.target.value, edit: false })
    }
  }
  removeTodo = id => { this.props.removeTodo({ id }) }
  selectTodo = (id, ev) => {
    const checked = ev.target.checked
    this.setState({ checked }, () => {
      this.props.updateTodo({ id, select: checked })
    })
  }
  completeTodo = id => { this.props.updateTodo({ id, complete: !this.props.complete }) }
  render () {
    const { value, checked } = this.state
    const { index, edit, complete, id } = this.props
    return (
     <TableRow>
       <TableCell padding="checkbox">
          <Checkbox checked={checked} onChange={(ev, status) => this.selectTodo(id, ev)} />
        </TableCell>
        <TableCell padding="none">{index + 1}</TableCell>
        <TableCell padding="none">
        {
          edit
          ? <Input
              autoFocus
              fullWidth
              value={value}
              onChange={this.onChangeInput}
              onBlur={(ev) => this.modifyTodo(ev, id)}
              onKeyUp={(ev) => this.modifyTodo(ev, id)}
            />
          : value
        }
        </TableCell>
        <TableCell padding="none"><EditIcon onClick={() => this.editTodo(id)} /></TableCell>
        <TableCell padding="none"><DeleteIcon onClick={() => this.removeTodo(id)} /></TableCell>
        <TableCell padding="none"><Checkbox checked={complete} onChange={() => this.completeTodo(id)} /></TableCell>
     </TableRow>
    )
  }
}

Todo.defaultProps = {
  data: {}
}