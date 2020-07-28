import React, {Component} from 'react'
import {fetchColors} from "../../api";
import {Colors, ColorInfoType} from '../../type'
import {colorsSort} from './utils'
import ICanvas from './components/canvas'
import styled from "styled-components";
import Loading from "../../components/loading";
import {connect} from "react-redux";
import actions from '../../store/colors/actionCreators'

interface IColorsProps {
  setColorInfo: (info: ColorInfoType) => void
}

interface IColorsState {
  colors: Array<Colors>
  gray: number
  loading: boolean
}

const StyledWrapper = styled.div`
  flex: 0 0 70vw;
  margin-right: 5vw;
  width: 70vw;
  padding: 1vh 0;
  box-sizing: border-box;
  height: 80vh;
  background: rgba(255,255,255,.1);
  border-radius: 10px;
  transition: background-color 2s ease-in;
  ul{
    height: 78vh;
    width: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, calc(350px + 2vh));
    grid-gap: 10px;
    justify-content: space-around;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  li{
   width: 100%;
   height: 110px;
   background: rgba(255,255,255,.2);
   margin: 1vh 0;
   padding: 0 1vh;
   border-radius: 5px;
   transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), background-color 2s ease-in;
   transform: scale(1);
   cursor: pointer;
   .title{
      transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      transform: scale(1);
   }
   &:hover{
    transform: scale(1.05);
    .title{
      transform: scale(1.15);
    }
   }
  }
`

const StyledArticle = styled.article`
  display: flex;
  color: #ffffff;
  font-size: 14px;
  flex-direction: column;
`

const StyledInformation = styled.aside`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const StyledTitle = styled.strong`
  flex: 0 0 60%;
  white-space: nowrap;
  span{
    font-family: 'VictorMono';
  }
`

const StyledSection = styled.section`
  flex: 0 0 25px;
  height: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
`

class ColorList extends Component<IColorsProps, IColorsState>{
  constructor(props: IColorsProps) {
    super(props)
    this.state = {
      colors: [],
      gray: 0,
      loading: false
    }
  }

  handleGetColors = () => {
    this.setState({
      loading: true
    })
    fetchColors().then(res => {
      const tempColors = colorsSort(res as Array<Colors>)
      // console.log(Array.from(new Set([''].concat(...tempColors.map(item => {
      //   return [''].concat(item.name.split(''))
      // })))).join(''))
      const index = parseInt(String(Math.random() * tempColors.length))
      const [r, g, b] = tempColors[index].RGB
      this.setState({
        colors: tempColors,
        gray: (r * 30 + g * 59 + b * 11) / 100
      })
      this.props.setColorInfo({...this.state.colors[index], gray: this.state.gray})
    }).finally(() => {
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 2000)
    })
  }

  handleClick = (color: Colors) => {
    const [r, g, b] = color.RGB
    const gray = (r * 30 + g * 59 + b * 11) / 100
    this.setState({
      gray
    })
    this.props.setColorInfo({...color, gray})
  }

  handleBackgroundColor = (result: number, alpha: number): string => {
    return result > 0 ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha})`
  }

  _renderColors = (colors: Array<Colors>): React.ReactElement[] => {
    return colors.map((item, index, arr) => {
      return (
        <li style={{backgroundColor: this.handleBackgroundColor(this.state.gray - 175, 0.2), boxShadow: `0 0 10px ${this.handleBackgroundColor(175 - this.state.gray, 0.1)}`}}
            onClick={() => {this.handleClick(item)}}
            key={item.name + item.pinyin}>
          <ICanvas cmyk={item.CMYK} rgb={item.RGB} />
          <StyledArticle>
            <StyledInformation className="font-small">
              <span>RGB: {item.RGB.join(', ')}</span>
              <span>CMYK: {item.CMYK.join(', ')}</span>
              <span>HEX: {item.hex.toLocaleUpperCase()}</span>
            </StyledInformation>
            <StyledInformation className="title">
              <StyledTitle>
                <cite>{item.name} <span className="font-small">{item.pinyin.toLocaleUpperCase()}</span></cite>
              </StyledTitle>
              <StyledSection style={{backgroundColor: `rgb(${item.RGB.join(',')})`}}/>
            </StyledInformation>
          </StyledArticle>
        </li>
      )
    })
  }

  componentDidMount() {
    this.handleGetColors()
  }

  render() {
    return (
      this.state.loading ? <Loading/> :
        <StyledWrapper style={{backgroundColor: this.handleBackgroundColor(this.state.gray - 175, 0.1), boxShadow: `0 0 10px ${this.handleBackgroundColor(175 - this.state.gray, 0.1)}`}}>
          <ul>
            {this._renderColors(this.state.colors)}
          </ul>
          {/*<ICanvas cmyk={[255,255,255,255]} rgb={[255,255,255]}/>*/}
        </StyledWrapper>
    );
  }
}

export default connect(state => state, actions)(ColorList)
