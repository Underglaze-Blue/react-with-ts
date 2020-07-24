import React, {Component} from 'react'
import styled from "styled-components";
import ColorList from "./list";
import ColorInfo from './information'
import {ColorInfoType} from "../../type";
import { connect } from 'react-redux'

interface IColorInfoStore {
  colorStore: ColorInfoType
}

interface IColorsProps{
  colorInfo: ColorInfoType
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
const mapStateToProps = (state: IColorInfoStore) => {
  return {
    colorInfo: state.colorStore
  }
}

class ChineseColors extends Component<IColorsProps, IColorsState>{
  constructor(props: IColorsProps) {
    super(props);
    this.state = {
      bgColor: `rgb(${this.props.colorInfo.RGB.join(',')})`,
      gray: 0
    }
  }
  render() {
    return (
      <StyledColorsWrapper style={{backgroundColor: this.state.bgColor}}>
        <StyledTitle style={{color: this.props.colorInfo.gray > 175 ? '#444444' : '#ffffff'}}>CHINESE COLORS</StyledTitle>
        <StyledMain>
          <ColorInfo />
          <ColorList />
        </StyledMain>
      </StyledColorsWrapper>
    );
  }
}

export default connect(mapStateToProps)(ChineseColors)
