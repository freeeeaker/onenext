import React, { PureComponent } from 'react'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import FilterListIcon from '@material-ui/icons/FilterList'
import { lighten } from '@material-ui/core/styles/colorManipulator'

@withStyles({
  table: {
    '& $td, & $th': {
      width: 40,
      textAlign: 'center'
    },
    '& $th:nth-child(3), & $td:nth-child(3)': {
      width: 'auto'
    },
    '& $td:nth-child(3)': {
      textAlign: 'left'
    }
  },
  tfoot: {
    marginTop: 10
  }
})
export default class Todo extends PureComponent {
  constructor () {
    super()
    this.state = {
      value: '',
      todoList: [],
      allSelected: false,
      status: 'all'
    }
  }
  onChange = (ev) => {
    this.setState({ value: ev.target.value })
  }
  onKeyUp = (ev) => {
    if (ev.keyCode === 13 && this.state.value) {
      this.setState({
        value: '',
        todoList: [
          ...this.state.todoList,
          {
            todo: this.state.value,
            id: Date.now(),
            time: new Date(),
            selected: false,
            done: false,
            edit: false
          }
        ]
      })
    }
  }
  selectTodo = (ev, status, index) => {
    const newTodoList = [
      ...this.state.todoList.slice(0, index),
      Object.assign({}, this.state.todoList[index], { selected: status }),
      ...this.state.todoList.slice(index + 1)
    ]
    this.setState({
      todoList: newTodoList,
      allSelected: newTodoList.every(i => i.selected)
    })
  }
  selectAll = (ev, status) => {
    this.setState({
      allSelected: status,
      todoList: this.state.todoList.map(i => Object.assign({}, i, { selected: status }))
    })
  }
  doneTodo = (ev, status, index) => {
    this.setState({
      todoList: [
        ...this.state.todoList.slice(0, index),
        Object.assign({}, this.state.todoList[index], { checked: status }),
        ...this.state.todoList.slice(index + 1)
      ]
    })
  }
  removeTodo = id => {
    const index = this.findIndexById(id, this.state.todoList)
    if (index < 0) return
    this.setState({
      todoList: [
        ...this.state.todoList.slice(0, index),
        ...this.state.todoList.slice(index + 1)
      ]
    })
  }
  editTodo = (index, id) => {
    this.setState({
      todoList: [
        ...this.state.todoList.slice(0, index),
        Object.assign({}, this.state.todoList[index], { edit: true }),
        ...this.state.todoList.slice(index + 1)
      ]
    })
  }
  modifyTodo = (ev, index) => {
    if ((ev.type === 'keyup' && ev.keyCode === 13) || ev.type === 'blur') {
      this.setState({
        todoList: [
          ...this.state.todoList.slice(0, index),
          Object.assign({}, this.state.todoList[index], { edit: false, todo: ev.target.value }),
          ...this.state.todoList.slice(index + 1)
        ]
      })
    }
    
  }
  clearSelected = () => {
    this.setState({
      todoList: this.state.todoList.filter(i => !i.selected)
    })
  }
  showTodos = status => {
    this.setState({ status })
  }
  findIndexById = (id, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return i
    }
    return -1
  }
  render() {
    const { value, todoList, allSelected, status } = this.state
    const { classes } = this.props
    const finalTodoList = todoList.filter(item => {
      if (status === 'done') return item.checked
      if (status === 'todo') return !item.checked
      return true
    })
    return (
      <div>
        <h4>React todoList</h4>
        <div>
          <Input
            fullWidth
            autoComplete="off"
            placeholder="input your todo item"
            value={value}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
        </div>
        {
          finalTodoList.length > 0 ?
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox checked={allSelected} onChange={this.selectAll} />
                </TableCell>
                <TableCell padding="none">index</TableCell>
                <TableCell padding="none">todo</TableCell>
                <TableCell padding="none">edit</TableCell>
                <TableCell padding="none">delete</TableCell>
                <TableCell padding="none">done</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              finalTodoList.map((todo, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={todo.id}
                    selected={todo.selected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={todo.selected} onChange={(ev, status) => this.selectTodo(ev, status, index)} />
                    </TableCell>
                    <TableCell padding="none">{index + 1}</TableCell>
                    <TableCell padding="none">
                    {
                      todo.edit ? <Input autoFocus fullWidth defaultValue={todo.todo} onBlur={(ev) => this.modifyTodo(ev, index)} onKeyUp={(ev) => this.modifyTodo(ev, index)} /> : todo.todo
                    }
                    </TableCell>
                    <TableCell padding="none"><EditIcon onClick={() => this.editTodo(index, todo.id)} /></TableCell>
                    <TableCell padding="none"><DeleteIcon onClick={() => this.removeTodo(todo.id)} /></TableCell>
                    <TableCell padding="none"><Checkbox checked={todo.checked} onChange={(ev, status) => this.doneTodo(ev, status, index)} /></TableCell>
                  </TableRow>
                )
              })
            }
            </TableBody>
          </Table>
          : <p>There currently are no todos </p>
        }
        {
          todoList.length > 0 &&
          <Grid container justify='space-between' className={classes.tfoot}>
            <Grid item>
              <Button onClick={this.clearSelected} >clear selected</Button>
              <Button onClick={() => this.setState({ todoList: [] })}>clear All</Button>
            </Grid>
            <Grid item>
              <Button onClick={() => this.showTodos('all')}>All</Button>
              <Button onClick={() => this.showTodos('done')}>done</Button>
              <Button onClick={() => this.showTodos('todo')}>todo</Button>
            </Grid>
          </Grid>
        }
      </div>
    )
  }
}