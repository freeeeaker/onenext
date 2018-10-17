import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

export default
@withStyles({
  root: {
    '& h2': {
      fontSize: 48,
      textAlign: 'center',
      fontWeight: 'lighter'
    },
    '& address': {
      textAlign: 'right'
    },
    '& ul, & ol': {
      padding: 0,
      margin: '20px 0'
    },
    '& li': {
      marginBottom: 5
    },
    '& ul li': {
      position: 'relative',
      listStyle: 'none',
      paddingLeft: 10,
    },
    '& ul li:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      top: 9,
      width: 6,
      height: 6,
      background: 'red',
      borderRadius: '50%'
    },
    '& blockquote': {
      margin: '10px 0',
      padding: '10px 20px',
      borderLeft: '2px solid #ccc',
    },
    '& p': {
      margin: '10px 0'
    },
    '& code': {
      padding: '0 4px',
      background: 'red',
      fontFamily: 'pingfang sc',
      borderRadius: 2,
      color: '#fff'
    },
    '& pre': {
      whiteSpace: 'pre-wrap'
    }
  }
})
class Article extends PureComponent {
  render () {
    const { classes, title, author, time } = this.props
    return (
      <div className={classes.root}>
        <h2>{title}</h2>
        <address><time>{time}</time> by {author}</address>
        {this.props.children}
      </div>
    )
  }
}