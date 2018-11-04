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
  root: {},
  ul: {
    width: 300,
    minHeight: 100,
    border: '1px solid #6cf',
    listStyle: 'none',
    padding: 2,
    '& li': {
      width: 90,
      height: 90,
      backgroundColor: palette.primary.light,
      borderRadius: '50%',
      marginBottom: 2,
      color: '#fff',
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all ease .3s'
    }
  },
  'u1': {
    '& .sm': {
      width: 45,
      height: 45
    }
  },
  'u5': {
    width: 375,
    '& li': {
      fontSize: 12,
      width: 120,
      height: 120
    }
  },
  'u6': {
    flexWrap: 'wrap',
    height: 400,
    '& li': {
      height: 'auto'
    }
  },
  'u7': {
    width: 400,
    '& li': {
      fontSize: 12,
      borderRadius: '0',
      border: '1px solid #000'
    },
    '& .l1': {
      width: 200
    },
    '& .l2': {
      width: 400
    }
  },
  flex: {
    display: 'flex',
  }
}))
class FlexDemo extends PureComponent {
  constructor () {
    super()
    this.state = {
      justify: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      direction: 'row',
      wrap: 'nowrap',
      flexGrowLeft: 0,
      flexGrowRight: 0,
      flexShrinkLeft: 0,
      flexShrinkRight: 0
    }
  }
  onChangeJustify = (ev) => {
    this.setState({ justify: ev.target.value })
  }
  onChangeAlignItems = (ev) => {
    this.setState({ alignItems: ev.target.value })
  }
  onChangeAlignContent = (ev) => {
    this.setState({ alignContent: ev.target.value })
  }
  onChangeDirection = (ev) => {
    this.setState({ direction: ev.target.value })
  }
  onChangeWrap = (ev) => {
    this.setState({ wrap: ev.target.value })
  }
  onChangeFlexGrow = (name, type) => {
    let originValue = this.state[`flexShrink${name}`]
    let value
    if (type === '-') {
      value = originValue === 0 ? 0 : originValue - 1
    } else {
      value = originValue + 1
    }
    this.setState({ [`flexShrink${name}`]: value })
  }
  onChangeFlexShrink = (name, type) => {
    let originValue = this.state[`flexShrink${name}`]
    let value
    if (type === '-') {
      value = originValue === 0 ? 0 : originValue - 1
    } else {
      value = originValue + 1
    }
    console.log('value:', value)
    this.setState({ [`flexShrink${name}`]: value })
  }
  render () {
    const { classes } = this.props
    const {
      justify,
      alignItems,
      direction,
      wrap,
      flexGrowLeft,
      flexGrowRight,
      alignContent,
      flexShrinkLeft,
      flexShrinkRight
    } = this.state
    const flexGorw1 = flexGrowLeft + flexGrowRight === 0 ? 'none' : (flexGrowLeft / (flexGrowLeft + flexGrowRight) * 100).toFixed(2) + '%'
    const flexGorw2 = flexGrowLeft + flexGrowRight === 0 ? 'none' : (flexGrowRight / (flexGrowLeft + flexGrowRight) * 100).toFixed(2) + '%'
    const leftWidth = 200
    const rightWidth = 400
    const TW = leftWidth * flexShrinkLeft + rightWidth * flexShrinkRight
    const originW1 = TW === 0 ? leftWidth : (leftWidth - leftWidth * flexShrinkLeft / TW * 200)
    const originW2 = TW === 0 ? rightWidth : (rightWidth - rightWidth * flexShrinkRight / TW * 200)
    // const flexShrink1 = leftWidth - flexShrinkLeft * 200
    // const flexShrink2 =
    return (
      <div className={classes.root}>
        <h5>flex属性，设置在父元素上的属性</h5>
        <div>
          <div>
            <FormControl>
              <FormLabel>justify-content:</FormLabel>
              <RadioGroup onChange={this.onChangeJustify} value={justify} row>
                <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                <FormControlLabel value="center" control={<Radio />} label="center" />
                <FormControlLabel value="space-between" control={<Radio />} label="space-between" />
                <FormControlLabel value="space-around" control={<Radio />} label="space-around" />
              </RadioGroup>
            </FormControl>
          </div>
          <ul className={classnames(classes.ul, classes.flex)} style={{justifyContent: justify}} >
            <li>1</li>
            <li>2</li>
          </ul>
        </div>
        <div>
          <div>
            <FormControl>
              <FormLabel>align-items:</FormLabel>
              <RadioGroup onChange={this.onChangeAlignItems} value={alignItems} row>
                <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                <FormControlLabel value="center" control={<Radio />} label="center" />
                <FormControlLabel value="baseline" control={<Radio />} label="baseline" />
                <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
              </RadioGroup>
            </FormControl>
          </div>
          <ul className={classnames(classes.ul, classes.flex, classes.u1)} style={{alignItems: alignItems}} >
            <li className="sm">1</li>
            <li>2</li>
          </ul>
        </div>
        <div>
          <div>
            <FormControl>
                <FormLabel>flex-direction:</FormLabel>
              <RadioGroup onChange={this.onChangeDirection} value={direction} row>
                <FormControlLabel value="row" control={<Radio />} label="row" />
                <FormControlLabel value="row-reverse" control={<Radio />} label="row-reverse" />
                <FormControlLabel value="column" control={<Radio />} label="column" />
                <FormControlLabel value="column-reverse" control={<Radio />} label="column-reverse" />
              </RadioGroup>
            </FormControl>
          </div>
          <ul className={classnames(classes.ul, classes.flex)} style={{flexDirection: direction}} >
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <div>
          <div>
            <FormControl>
                <FormLabel>flex-wrap:</FormLabel>
              <RadioGroup onChange={this.onChangeWrap} value={wrap} row>
                <FormControlLabel value="nowrap" control={<Radio />} label="nowrap" />
                <FormControlLabel value="wrap" control={<Radio />} label="wrap" />
                <FormControlLabel value="wrap-reverse" control={<Radio />} label="wrap-reverse" />
              </RadioGroup>
            </FormControl>
          </div>
          <ul className={classnames(classes.ul, classes.flex)} style={{flexWrap: wrap}} >
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
        <div>
          <div>
            <FormControl>
              <FormLabel>align-content:</FormLabel>
              <RadioGroup onChange={this.onChangeAlignContent} value={alignContent} row>
                <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                <FormControlLabel value="center" control={<Radio />} label="center" />
                <FormControlLabel value="space-between" control={<Radio />} label="space-between" />
                <FormControlLabel value="space-around" control={<Radio />} label="space-around" />
                <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
              </RadioGroup>
            </FormControl>
          </div>
          <ul className={classnames(classes.ul, classes.flex, classes.u6)} style={{alignContent: alignContent}} >
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
          </ul>
        </div>
        <div>
          <p>flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap</p>
        </div>
        <h5>flex属性，设置在子元素上的属性</h5>
        <div>
          <div>
            <FormControl>
                <FormLabel>flex-grow:</FormLabel>
              <FormGroup row>
                <Button size="small" variant="contained" color="primary" onClick={() => this.onChangeFlexGrow('Left', '-')}>LEFT: flex-grow - 1</Button>&nbsp;
                <Button size="small" variant="contained" color="secondary" onClick={() => this.onChangeFlexGrow('Left', '+')}>LEFT: flex-grow + 1</Button>&nbsp;
                <Button size="small" variant="contained" color="primary" onClick={() => this.onChangeFlexGrow('Right', '-')}>RIGHT: flex-grow - 1</Button>&nbsp;
                <Button size="small" variant="contained" color="secondary" onClick={() => this.onChangeFlexGrow('Right', '+')}>RIGHT: flex-grow + 1</Button>&nbsp;
              </FormGroup>
            </FormControl>
            <p>总宽度 375： 剩余宽度 135</p>
          </div>
          <ul className={classnames(classes.ul, classes.flex, classes.u5)} >
            <li style={{ flexGrow: flexGrowLeft }} >
              原始宽度：120<br/>
              flex-grow:{flexGrowLeft}
              <br/>
              剩余空间占比: {flexGorw1}
            </li>
            <li style={{ flexGrow: flexGrowRight }}>
              原始宽度：120<br/>
              flex-grow:{flexGrowRight}
              <br/>
              剩余空间占比: {flexGorw2}
            </li>
          </ul>
        </div>
        <div>
          <div>
            <FormControl>
                <FormLabel>flex-shrink:</FormLabel>
              <FormGroup row>
                <Button size="small" variant="contained" color="primary" onClick={() => this.onChangeFlexShrink('Left', '-')}>LEFT: flex-shrink - 1</Button>&nbsp;
                <Button size="small" variant="contained" color="secondary" onClick={() => this.onChangeFlexShrink('Left', '+')}>LEFT: flex-shrink + 1</Button>&nbsp;
                <Button size="small" variant="contained" color="primary" onClick={() => this.onChangeFlexShrink('Right', '-')}>RIGHT: flex-shrink - 1</Button>&nbsp;
                <Button size="small" variant="contained" color="secondary" onClick={() => this.onChangeFlexShrink('Right', '+')}>RIGHT: flex-shrink + 1</Button>&nbsp;
              </FormGroup>
            </FormControl>
            <p>总宽度 400, 需要收缩宽度 shrink-width: 200 + 400 - 400 = 200</p>
            <p>总权重 TW = w1 * s1 + s2 * s2 </p>
            <p>总权重 TW = 200 * {flexShrinkLeft} + 400 * {flexShrinkRight} = {TW} </p>
            <p>每个子项需要收缩的宽度 = flex-shrink * width / TW * shrink-width</p>
          </div>
          <ul className={classnames(classes.ul, classes.flex, classes.u7)} >
            <li style={{ flexShrink: flexShrinkLeft }} className="l1" >
              w1 = 原始宽度：200
              <br/>
              s1 = flex-shrink:{flexShrinkLeft}
              <br/>
              sw1 = 收缩宽度: 200 * {flexShrinkRight} / {TW} * 200
              <br/>
              实际宽度: {originW1}
            </li>
            <li style={{ flexShrink: flexShrinkRight }} className="l2">
              w2 = 原始宽度：400
              <br/>
              s2 = flex-shrink:{flexShrinkRight}
              <br />
              sw2 = 收缩宽度: 400 * {flexShrinkRight} / {TW} * 200
              <br/>
              实际宽度: {originW2}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}


