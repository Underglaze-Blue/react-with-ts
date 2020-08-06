import React, {Component} from 'react'

interface ICanvasLoadingProps {

}

interface ICanvasLoadingState {

}


class CanvasLoading extends Component<ICanvasLoadingProps, ICanvasLoadingState>{
  static canvas = React.createRef<HTMLCanvasElement>()

  renderCanvas () {
    const M = Math
    const PI = M.PI
    const TWOPI = PI * 2
    const HALFPI = PI / 2
    const ctx = (CanvasLoading.canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    const width = 350
    const height = 350
    const cx = width / 2
    const cy = height / 2
    const count = 40
    const sizeBase = 0.1
    const sizeDiv = 5
    let tick = 0

    ctx.translate(cx, cy);

    (function loop() {
      requestAnimationFrame(loop)
      ctx.clearRect(-width / 2, -height / 2, width, height)
      ctx.fillStyle = '#fff'
      let angle = tick / 8
      let radius = -50 + M.sin(tick / 15) * 100
      let size

      for (let i = 0; i < count; i++) {
        angle += PI / 64
        radius += i / 30
        size = sizeBase + i / sizeDiv

        ctx.beginPath()
        ctx.arc(M.cos(angle) * radius, M.sin(angle) * radius, size, 0, TWOPI, false)
        ctx.fillStyle = 'hsl(200, 70%, 50%)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(M.cos(angle) * -radius, M.sin(angle) * -radius, size, 0, TWOPI, false)
        ctx.fillStyle = 'hsl(320, 70%, 50%)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(M.cos(angle + HALFPI) * radius, M.sin(angle + HALFPI) * radius, size, 0, TWOPI, false)
        ctx.fillStyle = 'hsl(60, 70%, 50%)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(M.cos(angle + HALFPI) * -radius, M.sin(angle + HALFPI) * -radius, size, 0, TWOPI)
        ctx.fillStyle = 'hsl(0, 0%, 100%)'
        ctx.fill()
      }

      tick++
    })()

  }

  componentDidMount() {
    this.renderCanvas()
  }

  render() {
    return <canvas ref={CanvasLoading.canvas} width={350} height={350}/>
  }
}

export default CanvasLoading



