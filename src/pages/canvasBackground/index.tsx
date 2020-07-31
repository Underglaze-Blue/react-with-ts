import React, {Component} from 'react'

interface ICanvasBgProps {

}

interface ICanvasBgStates {

}

class CanvasBg extends Component<ICanvasBgProps, ICanvasBgStates> {
  static canvas = React.createRef<HTMLCanvasElement>()
  render() {
    return (
      'Canvas Background'
    )
  }
}

export default CanvasBg
