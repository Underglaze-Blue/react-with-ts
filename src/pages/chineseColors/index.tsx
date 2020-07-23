import React, {Component} from 'react'
import {fetchColors} from "../../api";
import {Colors} from '../../type'
import {colorsSort} from './utils'
import ICanvas from './canvas'
import styled from "styled-components";

interface IColorsProps {

}

interface IColorsState {
  colors: Array<Colors>
}

const StyledUl = styled.ul`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background: #ffffff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  li{
   flex: 0 0 350px;
   height: 100px;
   color: black;
  }
`

class ChineseColors extends Component<IColorsProps, IColorsState>{
  constructor(props: IColorsProps) {
    super(props)
    this.state = {
      colors: []
    }
  }

  handleGetColors = () => {
    fetchColors().then(res => {
      console.log(colorsSort(res as Array<Colors>))
      this.setState({
        colors: colorsSort(res as Array<Colors>)
      })
    })
  }

  _renderColors = (colors: Array<Colors>): React.ReactElement[] => {
    return colors.map(item => {
      return (
        <li>
          <ICanvas cmyk={item.CMYK} rgb={item.RGB} key={item.name + item.pinyin}/>
          <span>{item.name}</span>
          <span>{item.pinyin.toLocaleUpperCase()}</span>
        </li>
        )
    })
  }

  componentDidMount() {
    this.handleGetColors()
  }

  render() {
    return (
      this.state.colors.length > 0 && <StyledUl>
        {this._renderColors(this.state.colors)}
        {/*<ICanvas cmyk={[255,255,255,255]} rgb={[255,255,255]}/>*/}
      'CHINESE COLORS'
      </StyledUl>
    );
  }
}

export default ChineseColors
