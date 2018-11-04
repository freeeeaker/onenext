import React, { PureComponent } from 'react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormLabel from "@material-ui/core/FormLabel"
import classnames from 'classnames'
import MobileStepper from "@material-ui/core/MobileStepper"
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

export default
// @withTheme()
@withStyles(({ palette }) => ({
  root: {
    '& pre': {
      whiteSpace: 'pre'
    }
  },
  box: {
    display: 'grid',
    'border-top': '2px solid red',
    'border-bottom': '2px solid red',
    height: 360,
    '& div': {
      // width: 100,
      // height: 100,
      background: '#6cf',
      border: '1px solid',
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center'
    }
  },
  'box1': {
    'grid-template-rows': '100px 100px 100px',
    'grid-template-columns': '100px 100px 100px',
  },
  'box2': {
    'grid-template-rows': 'repeat(3, 100px)',
    'grid-template-columns': 'repeat(3,100px)',
  },
  'box3': {
    width: 300,
    height: 300,
    'grid-template-rows': 'repeat(2, 1fr) 100px',
    'grid-template-columns': 'repeat(3,1fr)',
  },
  'box4': {
    'grid-template-rows': 'repeat(3, 100px)',
    'grid-template-columns': 'repeat(4, 100px)',
    'grid-template-areas': `"header header header header" "main main . sidebar" "footer footer footer footer"`,
    '& .item-a': {
      'grid-area': 'header'
    },
    '& .item-b': {
      'grid-area': 'main'
    },
    '& .item-c': {
      'grid-area': 'sidebar'
    },
    '& .item-d': {
      'grid-area': 'footer'
    },
    '& .item-e': {
      'backgroundColor': '#fff'
    }
  },
  'box5': {
    'grid-template-rows': 'repeat(3, 100px)',
    'grid-template-columns': 'repeat(3,100px)',
    'grid-row-gap': '10px',
    'grid-column-gap': '5px'
  },
  'box6': {
    'grid-template-rows': 'repeat(3, 100px)',
    'grid-template-columns': 'repeat(3,100px)',
    'grid-gap': '10px 20px',
  },
  'box7': {
    'grid-template-rows': 'auto auto auto',
    'grid-template-columns': 'auto auto auto',
  },
  box8: {
    'grid-template-rows': '100px 100px',
    'grid-template-columns': '100px 100px',
    'grid-auto-columns': '60px',
    'grid-auto-rows': '60px',
    '& .item-a': {
      'grid-column': '5 / 6',
      'grid-row': '3 / 4'
    }
  }
}))
class GridDemo extends PureComponent {
  constructor () {
    super()
    this.state = {
      justifyItems: 'start',
      alignItems: 'start',
      justifyContent: 'start',
      alignContent: 'start',
      justifySelf: 'start',
      alignSelf: 'start'
    }
  }
  onChangeJustifyItems = (ev) => {
    this.setState({ justifyItems: ev.target.value })
  }
  onChangeAlignItems = (ev) => {
    this.setState({ alignItems: ev.target.value })
  }
  onChangeAlignContent = (ev) => {
    this.setState({ alignContent: ev.target.value })
  }
  onChangeJustifyContent = (ev) => {
    this.setState({ justifyContent: ev.target.value })
  }
  onChangeJustifySelf = (ev) => {
    this.setState({ justifySelf: ev.target.value })
  }
  onChangeAlignSelf = (ev) => {
    this.setState({ alignSelf: ev.target.value })
  }
  render () {
    const { classes } = this.props
    const {
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
      justifySelf,
      alignSelf
    } = this.state
   
    return (
      <div className={classes.root}>
        <p>Grid Container 的全部属性列表</p>
        <ul>
          <li>display: grid, inline-grid, subgrid</li>
          <li>grid-template-columns</li>
          <li>grid-template-rows</li>
          <li>gird-template-areas</li>
          <li>gird-template</li>
          <li>grid-column-gap</li>
          <li>gird-row-gap</li>
          <li>grid-gap</li>
          <li>justify-items</li>
          <li>align-items</li>
          <li>justify-content</li>
          <li>align-content</li>
          <li>grid-auto-columns</li>
          <li>grid-auto-rows</li>
          <li>grid-auto-flow</li>
          <li>grid</li>
        </ul>
        <p>Grid Items 的全部属性</p>
        <ul>
          <li>grid-column-start</li>
          <li>grid-column-end</li>
          <li>grid-row-start</li>
          <li>grid-row-end</li>
          <li>grid-column</li>
          <li>grid-row</li>
          <li>grid-area</li>
          <li>justify-self</li>
          <li>align-self</li>
        </ul>
        <p><code>column</code>,<code>float</code>,<code>clear</code>,<code>vertical</code>对一个 grid container 没有影响</p>
        <div>
          <pre>
            .box1 &#123;
              <br />
              &nbsp;&nbsp;display: flex;
              <br />
              &nbsp;&nbsp;grid-template-rows: 100px 100px 100px;
              <br />
              &nbsp;&nbsp;grid-template-columns: 100px 100px 100px;
              <br />
            &#125;
          </pre>
          <div className={classnames(classes.box, classes.box1)}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
        <div>
          <pre>
            .box2 &#123;
              <br />
              &nbsp;&nbsp;display: flex;
              <br />
              &nbsp;&nbsp;grid-template-rows: repeat(3, 100px);
              <br />
              &nbsp;&nbsp;grid-template-columns: repeat(3, 100px);
              <br />
            &#125;
          </pre>
          <div className={classnames(classes.box, classes.box2)}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
        <div>
          <pre>
            .box3 &#123;
              <br />
              &nbsp;&nbsp;display: flex;
              <br />
              &nbsp;&nbsp;width: 300px;
              <br />
              &nbsp;&nbsp;height: 300px;
              <br />
              &nbsp;&nbsp;grid-template-rows: repeat(2, 1fr) 100px;
              <br />
              &nbsp;&nbsp;grid-template-columns: repeat(3, 1fr);
              <br />
            &#125;
          </pre>
          <div className={classnames(classes.box, classes.box3)}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
        <div>
          <pre>
            .box4 &#123;
              <br />
              &nbsp;&nbsp;display: flex;
              <br />
              &nbsp;&nbsp;grid-template-rows: repeat(4, 100px);
              <br />
              &nbsp;&nbsp;grid-template-columns: repeat(3, 100px);
              <br />
              &nbsp;&nbsp;grid-template-areas:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"header header header header"<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"main main . sidebar"<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"footer footer footer footer"
              <br />
            &#125;
          </pre>
          <div className={classnames(classes.box, classes.box4)}>
            <div className="item-a">1</div>
            <div className="item-b">2</div>
            <div className="item-c">3</div>
            <div className="item-e">4 empty</div>
            <div className="item-d">5</div>
          </div>
        </div>
        <div>
          <p>grid-row-gap and grid-column-gap</p>
          <div className={classnames(classes.box, classes.box5)}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
        <div>
        <p>grid-gap 是 grid-row-gap 和 grid-column-gap 的组合写法</p>
          <div className={classnames(classes.box, classes.box6)}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <FormControl>
                <FormLabel>justify-items:</FormLabel>
                <RadioGroup onChange={this.onChangeJustifyItems} value={justifyItems} row>
                  <FormControlLabel value="start" control={<Radio />} label="start" />
                  <FormControlLabel value="end" control={<Radio />} label="end" />
                  <FormControlLabel value="center" control={<Radio />} label="center" />
                  <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <FormLabel>justify-self:</FormLabel>
                <RadioGroup onChange={this.onChangeJustifySelf} value={justifySelf} row>
                  <FormControlLabel value="start" control={<Radio />} label="start" />
                  <FormControlLabel value="end" control={<Radio />} label="end" />
                  <FormControlLabel value="center" control={<Radio />} label="center" />
                  <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={classnames(classes.box, classes.box1)} style={{justifyItems}}>
            <div style={{justifySelf}}>1</div>
            <div>22</div>
            <div>333</div>
            <div>4</div>
            <div>55</div>
            <div>666</div>
            <div>7</div>
            <div>88</div>
            <div>999</div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <FormControl>
                <FormLabel>align-items:</FormLabel>
                <RadioGroup onChange={this.onChangeAlignItems} value={alignItems} row>
                  <FormControlLabel value="start" control={<Radio />} label="start" />
                  <FormControlLabel value="end" control={<Radio />} label="end" />
                  <FormControlLabel value="center" control={<Radio />} label="center" />
                  <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <FormLabel>align-self:</FormLabel>
                <RadioGroup onChange={this.onChangeAlignSelf} value={alignSelf} row>
                  <FormControlLabel value="start" control={<Radio />} label="start" />
                  <FormControlLabel value="end" control={<Radio />} label="end" />
                  <FormControlLabel value="center" control={<Radio />} label="center" />
                  <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className={classnames(classes.box, classes.box1)} style={{alignItems}}>
            <div style={{alignSelf}}>1</div>
            <div>22</div>
            <div>333</div>
            <div>4</div>
            <div>55</div>
            <div>666</div>
            <div>7</div>
            <div>88</div>
            <div>999</div>
          </div>
        </div>
        <div>
          <div>
            <FormControl>
              <FormLabel>justify-content:</FormLabel>
              <RadioGroup onChange={this.onChangeJustifyContent} value={justifyContent} row>
                <FormControlLabel value="start" control={<Radio />} label="start" />
                <FormControlLabel value="end" control={<Radio />} label="end" />
                <FormControlLabel value="center" control={<Radio />} label="center" />
                <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                <FormControlLabel value="space-around" control={<Radio />} label="space-around" />
                <FormControlLabel value="space-between" control={<Radio />} label="space-between" />
                <FormControlLabel value="space-evenly" control={<Radio />} label="space-evenly" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classnames(classes.box, classes.box7)} style={{justifyContent}}>
            <div>1</div>
            <div>22</div>
            <div>333</div>
            <div>4</div>
            <div>55</div>
            <div>666</div>
            <div>7</div>
            <div>88</div>
            <div>999</div>
          </div>
        </div>
        <div>
          <div>
            <FormControl>
              <FormLabel>align-content:</FormLabel>
              <RadioGroup onChange={this.onChangeAlignContent} value={alignContent} row>
              <FormControlLabel value="start" control={<Radio />} label="start" />
                <FormControlLabel value="end" control={<Radio />} label="end" />
                <FormControlLabel value="center" control={<Radio />} label="center" />
                <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                <FormControlLabel value="space-around" control={<Radio />} label="space-around" />
                <FormControlLabel value="space-between" control={<Radio />} label="space-between" />
                <FormControlLabel value="space-evenly" control={<Radio />} label="space-evenly" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classnames(classes.box, classes.box7)} style={{alignContent}}>
            <div>1</div>
            <div>22</div>
            <div>333</div>
            <div>4</div>
            <div>55</div>
            <div>666</div>
            <div>7</div>
            <div>88</div>
            <div>999</div>
          </div>
        </div>
        <div>
        <div>
          <p>grid-auto-columns, grid-auto-rows</p>
          <div className={classnames(classes.box, classes.box8)}>
              <div className="item-a">1</div>
              <div>2</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


