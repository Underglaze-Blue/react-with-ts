import React,{Component} from 'react'
import styled from 'styled-components'

interface ILineProps {

}

interface ILineState {
  di: number
}

class Vector {

  x:number
  y:number
  cx:number
  cy:number
  cos:number
  sin:number

  constructor(cx:number, cy:number, reverse:boolean) {
    this.x = cx * Math.random()
    this.y = cy
    this.cx = cx
    this.cy = cy
    const radians = Math.PI / 180 * (Math.random() * 10 + 1)
    this.cos = Math.cos(reverse ? radians * -1 : radians)
    this.sin = Math.sin(reverse ? radians * -1 : radians)
  }

  tick() {
    const x = this.x - this.cx
    const y = this.y - this.cy
    this.x = this.cos * x + this.sin * y + this.cx
    this.y = this.cos * y - this.sin * x + this.cy
  }

}

const CanvasWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 0;
`

const StyledCanvas = styled.canvas`
  height: 100vh;
  left: calc(50%);
  position: absolute;
  top: calc(50%);
  transform: translate(-50%, -50%);
  width: auto;
`


class Line extends Component<ILineProps, ILineState>{
  static canvas = React.createRef<HTMLCanvasElement>()
  static orbits = React.createRef<HTMLCanvasElement>()
  constructor(props: ILineProps) {
    super(props)
    this.state = {
      di: Math.max(window.innerWidth, window.innerHeight) * 2
    }
  }

  renderCanvas() {
    const canvas = (Line.canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    const orbits = (Line.orbits.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D

    canvas.fillRect(0, 0, this.state.di, this.state.di)
    canvas.strokeStyle = 'rgba(255, 255, 255, 0.4)'

    orbits.fillStyle = 'white'

    const cx = this.state.di * 0.5
    const cy = this.state.di * 0.5

    const items = 6
    const vectors: Array<Vector> = []
    for (let i = 0; i < items; i++) {
      vectors.push(new Vector( cx, cy, i % 2 === 0))
    }
    let tick = 0
    const animate = () => {
      requestAnimationFrame(animate)

      if (tick > 10000) {
        canvas.clearRect(0, 0, this.state.di, this.state.di)
        tick = 0
      }

      orbits.clearRect(0, 0, this.state.di, this.state.di)

      canvas.beginPath()
      vectors.forEach((item, index) => {
        if (index === 0) {
          canvas.moveTo(item.x, item.y)
        }else {
          canvas.quadraticCurveTo(vectors[ index - 1].x,
            vectors[index - 1].y, item.x, item.y)
        }

        orbits.beginPath()
        orbits.arc(item.x, item.y, 5, 0, Math.PI * 2)
        orbits.fill()

        item.tick()
      })
      canvas.stroke()
      tick++
    }
    animate()
  }

  componentDidMount() {
    this.renderCanvas()
  }


  render() {
    return (
      <CanvasWrapper>
        <StyledCanvas width={this.state.di} height={this.state.di} ref={Line.canvas}/>
        <StyledCanvas width={this.state.di} height={this.state.di} ref={Line.orbits}/>
      </CanvasWrapper>
    )
  }
}

export default Line
