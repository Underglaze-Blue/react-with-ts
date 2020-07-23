import React, {Component} from 'react'
import {TupleColor} from "../../type";

interface ICanvasProps {
  cmyk?: TupleColor<number, 4>
  rgb?: TupleColor<number, 3>
  canvas: React.ReactNode
}

interface ICanvasState {

}

class ICanvas extends Component<ICanvasProps, ICanvasState> {
  canvas = React.createRef<HTMLCanvasElement>()

  constructor(props: ICanvasProps) {
    super(props)
  }
  static canvas = React.createRef()

  render() {
    return (
      <canvas ref={this.canvas} width={640} height={425} />
    )
  }
}

export default ICanvas
