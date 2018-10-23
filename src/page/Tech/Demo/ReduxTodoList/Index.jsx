import React, { PureComponent } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
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
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import FilterListIcon from '@material-ui/icons/FilterList'
import { lighten } from '@material-ui/core/styles/colorManipulator'

import TodoInput from './components/TodoInput'
import Footer from './components/Footer'
import Todo from './components/Todo'
import TodoList from './components/TodoList'

import reducers from './reducer/index'
const store = createStore(reducers)

@connect(function ({ todos, visibility }) {
  return { todos, visibility }
})
class App extends PureComponent {
  static displayName = 'redux todoList'
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
  selectAll = (ev, status) => {
    this.setState({
      allSelected: status,
      todoList: this.state.todoList.map(i => Object.assign({}, i, { selected: status }))
    })
  }
  clearSelected = () => {
    this.setState({
      todoList: this.state.todoList.filter(i => !i.selected)
    })
  }
  render() {
    const { todos, visibility } = this.props
    // const { classes } = this.props
    const finalTodoList = todos.filter(item => {
      if (visibility === 'COMPLETE') return item.select
      if (visibility === 'ACTIVE') return !item.select
      return true
    })
    return (
      <div>
        <h4>React Redux todoList</h4>
        <div>
          <TodoInput />
        </div>
        {
          finalTodoList.length > 0
          ? <TodoList>{ finalTodoList.map((todo, index) => <Todo {...todo} key={todo.id} index={index} />) }</TodoList>
          : <p>There currently are no todos </p>
        }
        {
          todos.length > 0 && <Footer />
        }
      </div>
    )
  }
}

export default function () {
  return <Provider store={ store }><App /></Provider>
}