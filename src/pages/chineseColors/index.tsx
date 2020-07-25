import React, {Component} from 'react'
import styled from "styled-components";
import ColorList from "./list";
import ColorInfo from './information'
import {ColorInfoType} from "../../type";
import { connect } from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'

interface IColorInfoStore {
  colorStore: ColorInfoType
}

interface IColorsProps extends RouteComponentProps{
  colorInfo: ColorInfoType
}

interface IColorsState {}

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
  font-weight: bolder;
  font-family: 'Omega-Sans';
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
  render() {
    return (
      <StyledColorsWrapper style={{backgroundColor: `rgb(${this.props.colorInfo.RGB.join(',')})`}}>
        <StyledTitle style={{color: this.props.colorInfo.gray > 175 ? '#444444' : '#ffffff'}}>CHINESE COLORS</StyledTitle>
        <StyledMain>
          <ColorInfo />
          <ColorList />
        </StyledMain>
      </StyledColorsWrapper>
    );
  }
}

export default withRouter(connect(mapStateToProps)(ChineseColors))
