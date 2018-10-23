import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter, Route } from 'react-router'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import NoteIcon from '@material-ui/icons/Note'
import PaletteIcon from '@material-ui/icons/Palette'
import AlbumIcon from '@material-ui/icons/Album'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import * as notes from './Note/'
import * as demos from './Demo/'

console.log(notes)

export default
@withRouter
@withStyles({
  grid: {
    marginTop: 20,
    maxWidth: 1280,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 20
  },
  leftItem: {
    marginRight: 10
  },
  rightItem: {
    flexGrow: 1
  },
  paper: {
    width: 240,
  },
  rightPaper: {
    padding: 20,
    marginRight: 10
  }
})
class Tech extends PureComponent {
  constructor () {
    super()
    this.state = {
      activeIndex: 0,
      demoOpen: false,
      noteOpen: false,
      designOpen: false,
      toolOpen: false
    }
  }
  onClickSideBar = (name, link) => {
    this.setState({ [name]: !this.state[name] })
    this.props.history.push(`/tech/${link}`)
  }
  render () {
    const { classes } = this.props
    const { demoOpen, noteOpen } = this.state
    return (
      <div>
        <Grid container wrap="nowrap" className={classes.grid}>
          <Grid item className={classes.leftItem}>
            <Paper className={classes.paper}>
              <List>
                <ListItem button onClick={ () => this.onClickSideBar('noteOpen', 'note') }>
                  <ListItemIcon>
                    <NoteIcon />
                    </ListItemIcon>
                  <ListItemText>Note</ListItemText>
                  {noteOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={noteOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    { Object.keys(notes).map(note => {
                      return (
                        <ListItem key={note} button className={classes.nested} onClick={ () => this.props.history.push(`/tech/note/${note}`) } >
                          <ListItemText inset>{notes[note].displayName}</ListItemText>
                        </ListItem>
                      )
                    }) }
                  </List>
                </Collapse>
                <ListItem button onClick={ () => this.onClickSideBar('demoOpen', 'demo') }>
                  <ListItemIcon>
                    <AlbumIcon />
                    </ListItemIcon>
                  <ListItemText>Demo</ListItemText>
                  {demoOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={demoOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                  { 
                    Object.keys(demos).map(demo => {
                      return (
                        <ListItem key={demo} button className={classes.nested} onClick={ () => this.props.history.push(`/tech/demo/${demo}`) } >
                          <ListItemText inset>{demo}</ListItemText>
                        </ListItem>
                      )
                    })
                  }
                  </List>
                </Collapse>
                <ListItem button onClick={ () => this.onClickSideBar('designOpen', 'design') }>
                  <ListItemIcon>
                    <PaletteIcon />
                    </ListItemIcon>
                  <ListItemText>Design</ListItemText>
                </ListItem>
                <ListItem button onClick={ () => this.onClickSideBar('toolOpen', 'tool') }>
                  <ListItemIcon>
                    <NoteIcon />
                    </ListItemIcon>
                  <ListItemText>Tool</ListItemText>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item className={classes.rightItem}>
            <Paper className={classes.rightPaper}>
              { 
                Object.keys(demos).map(demo => {
                  return (
                    <Route key={`/tech/demo/${demo}`} path={`/tech/demo/${demo}`} component={demos[demo]} />
                  )
                })
              }
              { 
                Object.keys(notes).map(note => {
                  return (
                    <Route key={`/tech/note/${note}`} path={`/tech/note/${note}`} component={notes[note]} />
                  )
                })
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}