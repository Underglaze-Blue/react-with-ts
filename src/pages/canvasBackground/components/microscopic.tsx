import React, {Component} from 'react'
import styled from 'styled-components'

const mouse = {
  x: 0,
  y: 0,
  rx:0,
  ry:0,
  speed:45,
  delta:0
}

interface IMicroscopicProps {

}

interface IMicroscopicState {

}

function update() {

  if (isNaN(mouse.delta) || mouse.delta <= 0) {
    return
  }

  const distX = mouse.x - (mouse.rx)
  const distY = mouse.y - (mouse.ry)

  if (distX !== 0 && distY !== 0) {

    mouse.rx -= ((mouse.rx - mouse.x) / mouse.speed)
    mouse.ry -= ((mouse.ry - mouse.y) / mouse.speed)

  }
}

function randomNorm(mean:number, stdev:number): number {
  return Math.abs(Math.round((Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1)) * stdev) + mean
}

class Particle{

  content: CanvasRenderingContext2D
  grad: CanvasGradient
  color: string
  shadowColor: string
  x:number
  y:number
  direction: {
    x: number
    y: number
  }
  radius: number
  scale: number
  rotation: number
  vx: number
  vy: number
  vAlpha: number
  width: number
  height: number

  constructor(content: CanvasRenderingContext2D) {
    const h = parseInt('360', 10)
    const s = parseInt(String(55 * Math.random() + 50), 10)
    const l = parseInt(String(25 * Math.random() + 50), 10)
    const a = 0.5 * Math.random()
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.content = content

    this.color = `hsla(${h},${s}%,${l}%,${a})`
    this.shadowColor = `hsla(${h},${s}%,${l}%,${parseFloat(String(a - 0.55))})`

    this.x = Math.random() * this.width
    this.y = Math.random() * this.height

    this.direction = {
      x: - 1 + Math.random() * 2,
      y: - 1 + Math.random() * 2
    }

    this.radius = randomNorm(0, 20)
    this.scale = 0.8 * Math.random() + 0.5
    this.rotation = Math.PI / 4 * Math.random()

    this.grad = this.content.createRadialGradient( this.x, this.y, this.radius, this.x, this.y, 0 )

    this.grad.addColorStop(0, this.color)
    this.grad.addColorStop(1, this.shadowColor)

    this.vx = (2 * Math.random() + 4) * 0.01 * this.radius
    this.vy = (2 * Math.random() + 4) * 0.01 * this.radius

    this.vAlpha = 0.01 * Math.random() - 0.02

  }

  move () {
    this.x += this.vx * this.direction.x
    this.y += this.vy * this.direction.y
    this.rotation += this.vAlpha
  }

  changeDirection (axis: 'x' | 'y') {
    this.direction[axis] *= - 1
    this.vAlpha *= - 1
  }

  draw () {
    this.content.save()
    this.content.translate(this.x + mouse.rx / - 20 * this.radius, this.y + mouse.ry / - 20 * this.radius)
    this.content.rotate(this.rotation)
    this.content.scale(1, this.scale)

    this.grad = this.content.createRadialGradient( 0, 0, this.radius, 0, 0, 0 )
    this.grad.addColorStop(1, this.color)
    this.grad.addColorStop(0, this.shadowColor)
    this.content.beginPath()
    this.content.fillStyle = this.grad
    this.content.arc(0, 0, this.radius, 0, Math.PI * 2, false)
    this.content.fill()
    this.content.restore()
  }

  boundaryCheck () {
    if (this.x >= this.width * 1.2) {
      this.x = this.width * 1.2
      this.changeDirection('x')
    } else if (this.x <= - this.width * 0.2) {
      this.x = - this.width * 0.2
      this.changeDirection('x')
    }
    if (this.y >= this.width * 1.2) {
      this.y = this.width * 1.2
      this.changeDirection('y')
    } else if (this.y <= - this.width * 0.2) {
      this.y = - this.width * 0.2
      this.changeDirection('y')
    }
  }
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  div{
    width: 100vw;
    height: 100vh;
    opacity: .5;
    background: -webkit-linear-gradient(top, #6b0000, white);
  }
`

class Microscopic extends Component<IMicroscopicProps, IMicroscopicState>{
  static canvas = React.createRef<HTMLCanvasElement>()
  now: number
  then: number
  particles: Array<Particle>
  constructor(props: IMicroscopicProps) {
    super(props)
    this.now = 0
    this.then = 0
    this.particles = []
  }

  renderCanvas() {
    const content = (Microscopic.canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    content.globalCompositeOperation = 'lighter'

    this.particles = []

    for (let i = 110; i >= 0; i--) {
      this.particles.push(new Particle(content))
    }

    const animateParticles = () => {
      content.clearRect(0, 0, window.innerWidth, window.innerHeight)

      this.now = (new Date()).getTime()
      mouse.delta = (this.now - this.then) / 1000
      this.then = this.now

      update()

      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].draw()
      }
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].move()
        this.particles[i].boundaryCheck()
      }
      requestAnimationFrame(animateParticles)
    }
    animateParticles()
  }

  componentDidMount() {
    this.renderCanvas()
  }

  render() {
    return (
      <StyledWrapper>
        <div>
          <canvas width={window.innerWidth} height={window.innerHeight} ref={Microscopic.canvas}/>
        </div>
      </StyledWrapper>
    )

  }
}

export default Microscopic
