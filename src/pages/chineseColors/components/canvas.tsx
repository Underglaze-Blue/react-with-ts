import React, {Component} from 'react'
import {TupleColor} from '../../../type'
import styled from 'styled-components'

interface ICanvasProps {
  cmyk: TupleColor<number, 4>
  rgb: TupleColor<number, 3>
}

interface ICanvasState {

}

const StyledDiv = styled.div`
  position: relative;
  width: 350px;
  height: 60px;
  img{
    width: 350px;
    height: 60px;
    position: absolute;
  }
`

class ICanvas extends Component<ICanvasProps, ICanvasState> {
  static canvas = React.createRef<HTMLCanvasElement>()

  componentDidMount() {
    const canvas = ICanvas.canvas.current
    const context = (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    const x = 50
    const y = 15

    const CMYKColor = ['#0093D3', '#CC006B', '#FFF10C', '#333333']
    const CMYKText = ['C', 'M', 'Y', 'K']

    const RGBColor = ['red', 'green', 'blue']
    const RGBText = ['R', 'G', 'B']

    const lineX = x * this.props.cmyk.length + 25

    context.lineWidth = 4
    context.font = '10px sans-serif'
    context.fillStyle = '#ffffff'
    context.lineCap = 'round'

    // cmyk环渲染
    this.props.cmyk.forEach((item, index) => {
      const endAngle = item === 0 ? (1.5 * Math.PI) : item === 100 ? (2 * Math.PI) : ((- 90 + (360 * item / 100)) * (Math.PI / 180))
      context.beginPath()
      context.arc(x * index + 25, y * 2, 20, item === 100 ? 0 : 1.5 * Math.PI, endAngle)
      context.fillText(CMYKText[index], x * index + 25, y * 3 - 5)
      context.strokeStyle = CMYKColor[index]
      // context.strokeStyle = 'rgba(54,52,51,.1)';
      context.stroke()
    })

    // rgb线条渲染
    this.props.rgb.forEach((item, index) => {
      const coefficient = 350 - lineX // 线条系数
      const lineToX = (lineX + coefficient * (item / 255))
      const yCoordinate = y * (index + 1) + 2 * index
      context.beginPath()
      context.strokeStyle = RGBColor[index]
      context.moveTo(lineX, yCoordinate)
      context.lineTo(lineToX, yCoordinate)
      context.fillText(RGBText[index], lineX - 20, y * (index + 1) + 4 * index)
      // context.strokeStyle = 'rgba(54,52,51,.1)';
      context.stroke()
    })
  }

  render() {
    return (
      <StyledDiv>
        <img alt='bg' src='../images/bg.png'/>
        <canvas ref={ICanvas.canvas} width={350} height={60} />
      </StyledDiv>
    )
  }
}

export default ICanvas
