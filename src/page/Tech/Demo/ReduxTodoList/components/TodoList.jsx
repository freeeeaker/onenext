import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'

import { selectAllTodos } from '../action/todo'

export default
@connect(({ todos }) => {
  return {
    todos
  }
}, dispatch => {
  return {
    setSelectAll: all => dispatch(selectAllTodos(all))
  }
})
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
  }
})
class TodoList extends PureComponent {
  constructor (props) {
    super()
    console.log(props)
    this.state = { selectAll: this.getAllSelectedStatus(props.todos) }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ selectAll: this.getAllSelectedStatus(nextProps.todos) })
  }
  getAllSelectedStatus (todos) {
    return todos.every(todo => todo.select)
  }
  onChangeSelectAll = (ev) => {
    const checked = ev.target.checked
    this.setState({ selectAll: checked }, () => {
      this.props.setSelectAll(checked ? 'ALL' : 'NONE')
    })
  }
  render () {
    const { classes } = this.props
    const { selectAll } = this.state
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox checked={selectAll} onChange={this.onChangeSelectAll} />
            </TableCell>
            <TableCell padding="none">index</TableCell>
            <TableCell padding="none">todo</TableCell>
            <TableCell padding="none">edit</TableCell>
            <TableCell padding="none">delete</TableCell>
            <TableCell padding="none">done</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.children}
        </TableBody>
      </Table>
    )
  }
}