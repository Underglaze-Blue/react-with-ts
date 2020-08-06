import React, {Component} from 'react'
import styled from 'styled-components'

interface ITreeProps {

}

interface ITreeState {

}

interface BranchConfig {
  x: number
  y: number
  fillStyle: string
  shadowColor: string
}

class BranchCollection{
  branches: Array<Branch>
  constructor() {
    this.branches = []
  }

  add (branch: Branch) {
    this.branches.push(branch)
  }

  // 依次处理集合内的每一个元素
  process () {
    this.branches.forEach(item => {
      item.process()
    })
  }

  remove (branch: Branch) {
    this.branches.forEach((item, index) => {
      if (item === branch) {
        this.branches.splice(index, 1)
      }
    })
  }

}

class Branch {

  context: CanvasRenderingContext2D
  x:number
  y:number
  radius: number
  angle: number
  speed: number
  shadowBlur: number
  generation: number
  distance: number
  fillStyle:string
  shadowColor:string
  branches: BranchCollection

  constructor(context: CanvasRenderingContext2D, branches: BranchCollection, config: BranchConfig = {
    x: window.innerWidth,
    y: window.innerHeight,
    fillStyle: '#000',
    shadowColor: '#000'
  }) {
    this.context = context
    this.x = config.x / 2
    this.y = config.y
    this.radius = 10
    this.angle = Math.PI / 2

    this.fillStyle = config.fillStyle
    this.shadowColor = config.shadowColor
    this.shadowBlur = 2

    this.speed = window.innerWidth / 500
    this.generation = 0
    this.distance = 0
    this.branches = branches
  }

  // 主要的处理过程发生在这里
  process () {
    // 在当前的坐标处画出一个圆形
    this.draw()
    // 把当前的branch继续向上延伸一部分
    this.iterate()
    this.split()
    this.die()
  }

  draw () {
    const context = this.context
    context.save()
    context.fillStyle = this.fillStyle
    context.shadowColor = this.shadowColor
    context.shadowBlur = this.shadowBlur
    context.beginPath()
    context.moveTo(this.x, this.y)
    // 图形是依靠在各个坐标处画出的圆形组合而成
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true)
    context.closePath()
    context.fill()
    context.restore()
  }

  iterate () {
    const deltaX = this.speed * Math.cos(this.angle)
    const deltaY = - this.speed * Math.sin(this.angle)

    // 利用speed控制需要向上延伸的距离
    this.x += deltaX
    this.y += deltaY
    // 根据当前是第几代，减小半径值
    this.radius *= (0.99 - this.generation / 250)

    // 求出距离的增量
    const deltaDistance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2))

    // distance指的是当前的这一段树枝的长度
    this.distance += deltaDistance

    // 控制speed的大小，使绘图时不至于在两个圆之间出现空白
    if (this.speed > this.radius * 2){
      this.speed = this.radius * 2
    }

    // 产生一个范围在（-0.1, 0.1)之间的随机数,对角度进行一个偏转
    this.angle += Math.random()/5 - 1/5/2
  }

  split () {
    let splitChance = 0
    // 树干部分，长度大于画面高度1/5时开始分叉
    if (this.generation == 1)
      splitChance = this.distance / window.innerHeight - 0.2
    // 树枝部分
    else if (this.generation < 3)
      splitChance = this.distance / window.innerHeight - 0.1

    if (Math.random() < splitChance) {
      // 下一代生成n个树枝
      const n = 2 + Math.round(Math.random() * 3)
      for (let i = 0; i < n; i++) {
        const branch = new Branch(this.context, this.branches)
        branch.x = this.x
        branch.y = this.y
        branch.angle = this.angle
        branch.radius = this.radius * 0.9
        branch.generation++
        branch.fillStyle =this.fillStyle

        // 将branch加入到集合中去
        this.branches.add(branch)
      }
      // 将父代branch删去
      this.branches.remove(this)
    }
  }

  die () {
    if (this.radius < 0.5) {
      this.branches.remove(this)
    }
  }

}

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`

class Tree extends Component<ITreeProps, ITreeState>{
  static canvas = React.createRef<HTMLCanvasElement>()

  renderCanvas () {

    const canvas = (Tree.canvas.current as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D

    // 设置初始的数量
    const n = 1 + Math.random() * 5

    // 设定初始的半径大小
    const initialRadius = window.innerWidth / 50

    const branches = new BranchCollection()


    // 新建一个集合用于放置所有的branch
    for (let i = 0; i < n; i++) {
      const branch = new Branch(canvas, branches)
      // 以canvas的中点为基准，左右各占一个initialRadius的宽度
      // 根据序号i算出初始x坐标
      branch.x = window.innerWidth / 2 - initialRadius + i * 2 * initialRadius / n
      branch.radius = initialRadius

      // 将新的branch加入集合中去
      branches.add(branch)
    }

    const interval = setInterval(function() {
      // 对集合内的每个元素依次进行处理
      branches.process()
      if (branches.branches.length == 0) {
        clearInterval(interval)
      }

    }, 20)
  }

  componentDidMount() {
    this.renderCanvas()
  }

  render() {
    return (
      <StyledWrapper>
        <canvas width={window.innerWidth} height={window.innerHeight} ref={Tree.canvas}/>
      </StyledWrapper>
    )
  }
}

export default Tree

