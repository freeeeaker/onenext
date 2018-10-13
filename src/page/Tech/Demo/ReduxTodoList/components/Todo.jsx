import React, { PureComponent } from 'react'

import { withStyles } from '@material-ui/core/styles'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

export default
@withStyles({

})
class Todo extends PureComponent {
  render () {
    const { selected, index, edit, todo } = this.props.data
    return (
     <TableRow>
       <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={(ev, status) => this.selectTodo(ev, status, index)} />
        </TableCell>
        <TableCell padding="none">{index + 1}</TableCell>
        <TableCell padding="none">
        {
          edit ? <Input autoFocus fullWidth defaultValue={todo} onBlur={(ev) => this.modifyTodo(ev, index)} onKeyUp={(ev) => this.modifyTodo(ev, index)} /> : todo.todo
        }
        </TableCell>
        <TableCell padding="none"><EditIcon onClick={() => this.editTodo(index, todo.id)} /></TableCell>
        <TableCell padding="none"><DeleteIcon onClick={() => this.removeTodo(todo.id)} /></TableCell>
        <TableCell padding="none"><Checkbox checked={todo.checked} onChange={(ev, status) => this.doneTodo(ev, status, index)} /></TableCell>
     </TableRow>
    )
  }
}

Todo.defaultProps = {
  data: {}
}