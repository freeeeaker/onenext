import React, { PureComponent } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'

export default class TodoList extends PureComponent {
  render () {
    const { allSelected, classes } = this.props
    return (
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
          {this.props.children}
        </TableBody>
      </Table>
    )
  }
}