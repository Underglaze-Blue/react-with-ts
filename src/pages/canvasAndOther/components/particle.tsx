import React, {Component} from 'react'
import styled from 'styled-components'

interface IParticleProps {
  text?: string
}
interface IParticleState {
  points: ParticleConstructor[]
}

interface centerType {
  x: number
  y: number
}

const StyledWrapper = styled.main`
width: 100vw;
height: 100vh;
background: rgba(255,255,255,.9);
`

// eslint-disable-next-line max-params
const threeBezier = (t: number, p1: number[], p2: number[], cp1: number[], cp2: number[]) => {
  const [startX, startY] = p1
  const [endX, endY] = p2
  const [cpX1, cpY1] = cp1
  const [cpX2, cpY2] = cp2
  const x = startX * Math.pow(1 - t, 3) +
    3 * cpX1 * t * Math.pow(1 - t, 2) +
    3 * cpX2 * Math.pow(t, 2) * (1 - t) +
    endX * Math.pow(t, 3)
  const y = startY * Math.pow(1 - t, 3) +
    3 * cpY1 * Math.pow(1 - t, 2) * t +
    3 * cpY2 * (1 - t) * Math.pow(t, 2) +
    endY * Math.pow(t, 3)
  return {
    x,
    y
  }
}

class ParticleConstructor {
  x: number
  y: number
  item: number
  vx: number
  vy: number
  initX: number
  initY: number
  color: string
  ctx: CanvasRenderingContext2D
  constructor(ctx: CanvasRenderingContext2D, center: centerType, config = {
    vx: 20,
    vy: 16,
    color: 'crimson'
  }) {
    this.x = center.x // 记录点位最终应该停留在的x轴位置
    this.y = center.y // 记录点位最终应该停留在的y轴位置
    this.item = 0 // 贝塞尔曲线系数 0-1
    this.vx = config.vx // 点位在x轴的移动速度
    this.vy = config.vy // 点位在y轴的移动速度
    this.initX = Math.random() * window.innerWidth // 点位随机在画布中的x坐标
    this.initY = Math.random() * window.innerHeight // 点位随机在画布中的y坐标
    this.color = config.color
    this.ctx = ctx
  }

  draw() { // 绘制点位
    this.ctx.beginPath()
    const {x, y} = threeBezier( // 贝塞尔曲线，获取每一个tick点位所在位置
      this.item,
      [this.initX, this.initY],
      [this.x, this.y],
      [this.x, this.y],
      [this.x, this.y]
    )
    this.ctx.arc(x, y, 2, 0, 2 * Math.PI, true)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.closePath()
    this.speed() // 点位下次tick绘制时的坐标
  }

  speed() { // 每个点位绘制后的坐标
    this.initX += this.vx
    this.initY += this.vy
    this.item += 0.01
  }
}


class Particle extends Component<IParticleProps, IParticleState>{
  static canvas = React.createRef<HTMLCanvasElement>()
  static text = React.createRef<HTMLCanvasElement>()
  width: number
  height: number
  raf: number
  constructor(props: IParticleProps) {
    super(props)
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.raf = 0
    this.state = {
      points: []
    }
  }

  getFontInfo(ctx: CanvasRenderingContext2D): ParticleConstructor[] { // 文字取点，获取每个文字在画布中的坐标。
    const imageData = ctx.getImageData(0, 0, this.width, this.height).data
    const context = (Particle.canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    const particles = []
    const color = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(- 6)
    for (let x = 0; x < this.width; x += 4) {
      for (let y = 0; y < this.height; y += 4) {
        const fontIndex = (x + y * this.width) * 4 + 3
        if (imageData[fontIndex] > 0) {
          particles.push(new ParticleConstructor(context, {
            x,
            y
          }, {
            vx: 20,
            vy: 10,
            color
          }))
        }
      }
    }
    return particles
  }

  initTextCanvas(ctx: CanvasRenderingContext2D){
    const font = this.props.text || 'React & Typescript'
    ctx.font = '100px "Halva"'
    const measure = ctx.measureText(font)
    console.log(measure.width)
    // console.log(ctx.measureText('hello'))
    ctx.fillText(font, (this.width - measure.width) / 2, this.height / 2)
  }

  init(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height)
    this.state.points .forEach((value: ParticleConstructor) => { //
      value.draw()
    })
    this.raf = requestAnimationFrame(() => {this.init(ctx)})
    if (this.state.points[0].item >= 1){
      cancelAnimationFrame(this.raf)
    }
  }

  renderCanvas() {
    const text = (Particle.text.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    const context = (Particle.canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    this.initTextCanvas(text)
    this.setState({
      points: this.getFontInfo(text)
    }, () => {
      this.init(context)
    })
  }

  componentDidMount() {
    this.renderCanvas()
  }

  render() {
    return (
      <StyledWrapper>
        <canvas width={this.width} height={this.height} ref={Particle.canvas}/>
        <canvas style={{display: 'none'}} width={this.width} height={this.height} ref={Particle.text}/>
      </StyledWrapper>
    )
  }
}

export default Particle
