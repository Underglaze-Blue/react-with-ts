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
  constructor(props: ICanvasProps) {
    super(props);
  }
  static canvas = React.createRef()

  componentDidMount() {
    const canvas = this.refs.canvas
  }

  render() {
    return (
      <canvas ref={ICanvas.canvas} width={640} height={425} />
    )
  }
}
