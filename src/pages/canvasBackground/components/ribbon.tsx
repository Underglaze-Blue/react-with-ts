import React, {Component} from 'react'
import styled from 'styled-components'

const StyledCanvas = styled.canvas`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
`

interface tempObj {
  x: number
  y: number
}

interface IRibbonProps {
  zIndex?: number
  alpha?: number
  size?: number
}

interface IRibbonState {
  width: number
  height: number
  pi: number
  size: number
  temp: Array<tempObj>,
  radius: number,
  pr: number
}

class Ribbon extends Component<IRibbonProps, IRibbonState>{
  static canvas = React.createRef<HTMLCanvasElement>()

  constructor(props: IRibbonProps) {
    super(props)
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      pi: Math.PI * 2,
      size: this.props.size || 90,
      temp: [],
      radius: 0,
      pr: window.devicePixelRatio || 1
    }
  }
  setCanvasConfig() {
    const context = (Ribbon.canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    context.scale(this.state.pr, this.state.pr)
    context.globalAlpha = 0.6
  }
  renderCanvas() {
    const context = (Ribbon.canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    // context.scale(this.state.pr, this.state.pr)
    // context.globalAlpha = 0.6
    context.clearRect(0, 0, this.state.width, this.state.height)
    this.setState({
      temp: [{x: 0, y: this.state.height * 0.7 + this.state.size}, {x: 0, y: this.state.height * 0.7 - this.state.size}]
    }, () => {
      this.draw(this.state.temp[0], this.state.temp[1], context)
    })
  }

  draw(i: tempObj, j: tempObj, context: CanvasRenderingContext2D) {
    context.beginPath()
    context.moveTo(i.x, i.y)
    context.lineTo(j.x, j.y)
    const k = j.x + ( Math.random() * 2 - 0.25 ) * this.state.size
    const n = this.line(j.y)
    context.lineTo(k, n)
    context.closePath()
    this.setState({
      radius: this.state.radius - this.state.pi / 50,
      temp: [this.state.temp[1], {x: k, y: n}]
    }, () => {
      const r = this.state.radius
      const pi = this.state.pi
      context.fillStyle = '#' + ( Math.cos(r) * 127 + 128 << 16 | Math.cos(r + pi / 3 ) * 127 + 128 << 8 | Math.cos(r + pi / 3 * 2 ) * 127 + 128 ).toString(16)
      context.fill()
      if (this.state.temp[1].x < this.state.width + this.state.size) {
        this.draw(this.state.temp[0], this.state.temp[1], context)
      }
    })
  }

  line(x: number): number {
    const temp = x + (Math.random() * 2 - 1.1) * this.state.size
    return (temp > this.state.height || temp < 0) ? this.line(x) : temp
  }

  componentDidMount() {
    this.setCanvasConfig()
    this.renderCanvas()
  }

  render() {
    const style = {
      opacity: this.props.alpha || 0.6,
      zIndex: this.props.zIndex || 1
    }
    return <StyledCanvas onClick={() => {this.renderCanvas()}} width={this.state.width * this.state.pr} height={this.state.height * this.state.pr} style={style} ref={Ribbon.canvas} />
  }
}

export default Ribbon
