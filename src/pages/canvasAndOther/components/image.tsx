import React, {Component} from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

interface IImageProps {
  width: number
  height: number
  img: any
  delay?: number
}

interface IImageState {
  index: number
}

const StyledImg = styled.img`
  object-fit: cover;
  border-radius: 1vh;
  //进场前的瞬间
  &.img-enter, &.img-appear{
      opacity: 0;
  }
  //进场过程中
  &.img-enter-active, &.img-appear-active{
      opacity: 1;
      transition: opacity 1s;
  }
  //进场之后
  &.img-enter-done{
      opacity: 1;
  }
  //离开前的瞬间
  &.img-exit{
      opacity: 1;
  }
  //离开过程中
  &.img-exit-active{
      opacity: 0;
      transition: opacity 1s;
  }
  //离开后
  &.img-exit-done{
      opacity: 0;
  }
`

class ImageMask extends Component<IImageProps, IImageState> {
  static canvas = React.createRef<HTMLCanvasElement>()
  animateId: number
  constructor(props: IImageProps) {
    super(props)
    this.state = {
      index: 0
    }
    this.animateId = 0
  }

  draw(content: CanvasRenderingContext2D, img: HTMLImageElement, imgMask: HTMLImageElement) {
    this.state.index > this.props.width && cancelAnimationFrame(this.animateId)
    this.setState({
      index: this.state.index + 10
    }, () => {
      const maskX = (this.props.width - (70 + this.state.index)) / 2
      const maskY = (this.props.height - (40 + this.state.index)) / 2

      content.clearRect(0, 0, this.props.width, this.props.height)
      content.globalCompositeOperation = 'source-over'

      content.drawImage(imgMask, maskX, maskY, 70 + this.state.index, 40 + this.state.index)

      content.globalCompositeOperation = 'source-in'

      // content.drawImage(img, 0, 0, this.props.width, this.props.height)

    })
    this.animateId = requestAnimationFrame(() => {this.draw(content, img, imgMask)})
  }


  renderCanvas() {
    const canvas = (ImageMask.canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    const imgMask = new Image()
    const img = new Image()
    img.width = this.props.width
    img.height = this.props.height
    img.src = this.props.img
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    imgMask.src = require('../image/smoke.png')
    img.onload = () => {
      setTimeout(() => {
        this.draw(canvas, img, imgMask)
      }, this.props.delay || 0)
    }
  }


  componentDidMount() {
    this.renderCanvas()
  }

  render() {
    return (
      <div style={{width: this.props.width + 'px', height: this.props.height + 'px'}}>
        {this.state.index > this.props.width ?
          <CSSTransition in={this.state.index > this.props.width} timeout={this.props.delay || 0} classNames="img" appear={true} unmountOnExit>
            <StyledImg width={this.props.width} height={this.props.height} src={this.props.img}/>
          </CSSTransition>
          :
          <canvas width={this.props.width} height={this.props.height} ref={ImageMask.canvas}/>}
      </div>
    )

  }
}

export default ImageMask
