import React, {Component} from 'react'
import styled from "styled-components";
import ColorList from "./list";

interface IColorsProps {

}

interface IColorsState {

}

const StyledColorsWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background: #ffffff;
  display: flex;
`

class ChineseColors extends Component<IColorsProps, IColorsState>{
  render() {
    return (
      <StyledColorsWrapper>
        <ColorList/>
      </StyledColorsWrapper>
    );
  }
}

export default ChineseColors
