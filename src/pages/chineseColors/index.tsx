import React, {Component} from 'react'
import styled from "styled-components";
import ColorList from "./list";
import ColorInfo from './information'
import {TupleColor} from "../../type";

interface IColorsProps {

}

interface IColorsState {
  bgColor: string
  gray: number
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
  transition: color 2s ease-in;
`

const StyledMain = styled.main`
  display: flex;
`

class ChineseColors extends Component<IColorsProps, IColorsState>{
  constructor(props: IColorsProps) {
    super(props);
    this.state = {
      bgColor: '',
      gray: 0
    }
  }
  _setBackgroundColor = (rgb: TupleColor<number, 3>, gray: number) => {
    this.setState({
      bgColor: `rgb(${rgb.join(',')})`,
      gray
    })
  }
  render() {
    return (
      <StyledColorsWrapper style={{backgroundColor: this.state.bgColor}}>
        <StyledTitle style={{color: this.state.gray > 175 ? '#444444' : '#ffffff'}}>CHINESE COLORS</StyledTitle>
        <StyledMain>
          <ColorInfo />
          <ColorList setBackgroundColor={this._setBackgroundColor}/>
        </StyledMain>
      </StyledColorsWrapper>
    );
  }
}

export default ChineseColors
