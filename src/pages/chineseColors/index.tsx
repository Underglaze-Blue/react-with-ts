import React, {Component} from 'react'
import styled from "styled-components";
import ColorList from "./list";
import {TupleColor} from "../../type";

interface IColorsProps {

}

interface IColorsState {
  bgColor: string
}

const StyledColorsWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 0 0 10vh;
  background: #ffffff;
  transition: background-color 2s ease-in;
  overflow: hidden;
  box-sizing: border-box;
`
const StyledTitle = styled.h1`
  padding: 2vh 0;
`

class ChineseColors extends Component<IColorsProps, IColorsState>{
  constructor(props: IColorsProps) {
    super(props);
    this.state = {
      bgColor: ''
    }
  }
  _setBackgroundColor = (rgb: TupleColor<number, 3>) => {
    this.setState({
      bgColor: `rgb(${rgb.join(',')})`
    })
    console.log(this.state.bgColor)
  }
  render() {
    return (
      <StyledColorsWrapper style={{backgroundColor: this.state.bgColor}}>
        <StyledTitle className="color-white">CHINESE COLORS</StyledTitle>
        <ColorList setBackgroundColor={this._setBackgroundColor}/>
      </StyledColorsWrapper>
    );
  }
}

export default ChineseColors
