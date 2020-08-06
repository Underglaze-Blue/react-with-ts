import React, {Component} from 'react'
import Ribbon from './components/ribbon'
import Line from './components/line'
import CanvasLoading from './components/loading'
import Microscopic from './components/microscopic'
import Tree from './components/tree'
import styled from 'styled-components'

const StyledMain = styled.main`
  width: 100vw;
  height: 100vh;
`

interface ICanvasBgProps {

}

interface ICanvasBgStates {
  child: this
}

class CanvasBg extends Component<ICanvasBgProps, ICanvasBgStates> {
  static canvas = React.createRef<HTMLCanvasElement>()
  render() {
    return (
      <StyledMain>
        {/* <Tree />*/}
        <Microscopic />
        {/* <Line />*/}
        {/* <CanvasLoading />*/}
        {/* <Ribbon />*/}
        Canvas Background
      </StyledMain>
    )
  }
}

export default CanvasBg
