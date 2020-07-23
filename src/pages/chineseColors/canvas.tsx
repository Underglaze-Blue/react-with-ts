import React, {Component} from 'react'
import {TupleColor} from "../../type";
import styled from "styled-components";

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
  constructor(props: ICanvasProps) {
    super(props);
  }
  static canvas = React.createRef<HTMLCanvasElement>()

  componentDidMount() {
    const canvas = ICanvas.canvas.current
    let context = (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    const x = 50
    const y = 15
    const CMYKColor = ['#0093D3', '#CC006B', '#FFF10C', '#333333']
    const CMYKText = ['C', 'M', 'Y', 'K']
    const RGBColor = ['red', 'green', 'blue']
    const RGBText = ['R', 'G', 'B']
    const lineX = x * this.props.cmyk.length + 25
    context.lineWidth = 4;
    context.font = "10px sans-serif"
    context.fillStyle = '#ffffff'
    context.lineCap = 'round'
    this.props.cmyk.forEach((item, index) => {
      const endAngle = item === 0 ? (1.5 * Math.PI) : ((-90 + (360 * item / 100)) * (Math.PI / 180));
      context.beginPath();
      context.arc(x * index + 25,y * 2,20,1.5 * Math.PI, endAngle);
      context.fillText(CMYKText[index], x * index + 25, y * 3 - 5)
      context.strokeStyle = CMYKColor[index];
      // context.strokeStyle = 'rgba(54,52,51,.1)';
      context.stroke();
    })
    this.props.rgb.forEach((item, index) => {
      context.beginPath();
      context.moveTo(lineX,y * (index + 1) + 2 * index);
      context.lineTo(lineX + lineX * (item / 255),y * (index + 1) + 2 * index)
      context.fillText(RGBText[index], lineX - 20, y * (index + 1) + 4 * index)
      context.strokeStyle = RGBColor[index];
      // context.strokeStyle = 'rgba(54,52,51,.1)';
      context.stroke();
    })
  }

  render() {
    return (
      <StyledDiv>
        <img src={require('./images/bg.png')}/>
        <canvas ref={ICanvas.canvas} width={350} height={60} />
      </StyledDiv>
    )
  }
}

export default ICanvas
