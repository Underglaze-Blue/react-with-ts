import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {ColorInfoType, TupleColor} from "../../type";
import styled from "styled-components";
import CircleSVG from './components/svg'
import {rgb2hsv} from './utils'
import CountUp from 'react-countup';

interface IColorInfoStore {
  colorStore: ColorInfoType
}

interface IColorInfoProps {
  colorInfo: ColorInfoType
}

interface IColorInfoState {
  r: number[],
  g: number[],
  b: number[],
  h: number[],
  s: number[],
  v: number[],
  gray: number[]

}

const StyledWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 1vh;
`

const StyledMain = styled.main`
  width: 300px;
  height: 80vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 160px 140px;
  border-radius: 10px;
  transition: background-color 2s ease-in;
`

const StyledTitle = styled.h1`
  font-size: 100px;
  width: 110px;
  min-height: 540px;
  line-height: 140px;
  font-weight: 400;
  flex: 0 0 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: 'yuweif2229ad0221222ab', "Microsoft YaHei";
`

const StyledHSV = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 90px 0;
  aside{
    display: flex;
    span{
      font-size: 18px;
      margin-right: 5px;
    }
  }
`

const StyledInfo = styled.section`
  box-sizing: border-box;
  height: 650px;
  padding: 20px 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cite{
    font-size: 20px;
    word-break: break-all;
  }
`

const StyledInformation = styled.section`
  grid-column-start: 1;
  grid-column-end: 3; 
  padding: 10px;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  cite{
    flex: 1;
    white-space: nowrap;
  }
`

const mapStateToProps = (state: IColorInfoStore) => {
  return {
    colorInfo: state.colorStore
  }
}

class ColorInfo extends PureComponent<IColorInfoProps, IColorInfoState>{
  constructor(props: IColorInfoProps) {
    super(props);
    const info = this.props.colorInfo
    const hsv = rgb2hsv(info.RGB)
    this.state = {
      r: [0, info.RGB[0]],
      g: [0, info.RGB[1]],
      b: [0, info.RGB[2]],
      h: [0, hsv[0]],
      s: [0, hsv[1]],
      v: [0, hsv[2]],
      gray: [0, info.gray]
    }
  }

  componentDidUpdate (nextProps: IColorInfoProps, prevState: IColorInfoState) {}

  handleBackgroundColor = (gray: number, alpha: number): string => {
    return gray > 175 ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha})`
  }

  renderCountUp = (rgb: TupleColor<number, 3>, type: string): React.ReactElement[] => {
    let arr = type === 'RGB' ? rgb : rgb2hsv(rgb)
    const unit = ['°', '%', '%']
    return arr.map((item, index) => {
      return (
        <React.Fragment key={type.split('')[index]}>
          <CountUp preserveValue end={item}/>
          <span>{type === 'RGB' ? '' : unit[index]}{index < arr.length - 1 ? ', ' : ''}</span>
        </React.Fragment>
      )
    })
    // return `${h}°, ${s}%, ${v}%`
  }

  renderSVG = (cmyk: TupleColor<number, 4>): React.ReactElement[] => {
    const CMYKColor = ['#0093D3', '#CC006B', '#FFF10C', '#333333']
    const CMYKText = ['C', 'M', 'Y', 'K']
    return cmyk.map((item, index) => {
      return (
        <aside key={CMYKColor[index]}>
          <span>{CMYKText[index]}</span>
          <CircleSVG key={CMYKColor[index]} color={CMYKColor[index]} percent={item}/>
        </aside>
      )
    })
  }

  render() {
    return(
      <StyledWrapper>
        <StyledMain style={{backgroundColor: this.handleBackgroundColor(this.props.colorInfo.gray, 0.1)}}>
          <StyledHSV>
            {this.renderSVG(this.props.colorInfo.CMYK)}
          </StyledHSV>
          <StyledInfo>
            <StyledTitle style={{lineHeight: this.props.colorInfo.name.length < 5 ? '140px' : '110px'}}>{this.props.colorInfo.name}</StyledTitle>
            <cite>{this.props.colorInfo.pinyin.toLocaleUpperCase()}</cite>
          </StyledInfo>
          <StyledInformation>
            <cite>RGB: {this.renderCountUp(this.props.colorInfo.RGB, 'RGB')}
            </cite>
            <cite>Gray scale:
              <CountUp key="gray" decimals={2}
                       preserveValue
                       end={this.props.colorInfo.gray}/></cite>
            <cite>HSV: {this.renderCountUp(this.props.colorInfo.RGB, 'HSV')}</cite>
            <cite>HEX: {this.props.colorInfo.hex.toLocaleUpperCase()}</cite>
          </StyledInformation>
        </StyledMain>
      </StyledWrapper>
    )
  }
}

export default connect(mapStateToProps)(ColorInfo)
