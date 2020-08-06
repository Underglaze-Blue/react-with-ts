import React, {Component, ReactNode} from 'react'
import {_360DEGREE} from '../utils/date'
import styled from 'styled-components'

const StyledPointsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledPlate = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  color: #95a5a6;
  position: relative;
`

const StyledPoints = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  transition: transform .5s ease-in-out;
`

const StyledPoint = styled.p`
  display: inline-block;
  &.point-right{
    float: right;
  }
  &.point-left{
    float: left;
    transform: rotate(180deg);
  }
  &.rooter{
    font-size: 18px;
    color: #ecf0f1;
  }
`

interface IPlateProps {
  array: Array<string>
  size: number
  currentTime: number
}

interface IPlateState {

}


class Plate extends Component<IPlateProps, IPlateState> {

  renderPlate (): ReactNode[] {
    const array = this.props.array
    const size = this.props.size
    const halfLength = array.length / 2
    const rotateDegree = _360DEGREE / array.length

    if (array.length === 7) {// WEEKS
      for (let i = 1; i <= 3; i++) array.push('')// 补齐偶数圆，不在12，24
    } else if (array.length % 2 != 0) {
      array.push('')
    }

    let rotate = [12, 24].includes(array.length) ?
      this.props.currentTime * rotateDegree :
      this.props.currentTime * rotateDegree - rotateDegree

    const points = []

    for (let i = 0;i < halfLength;i++) {
      let htmlStr
      if (rotate === 0) {
        htmlStr = (
          <>
            <StyledPoint className="point-right rooter" key={`${array[i]} ${i}`}>{array[i]}</StyledPoint>
            <StyledPoint className="point-left" key={array[i + halfLength]}>{array[i + halfLength]}</StyledPoint>
          </>
        )
      } else if (Math.abs(rotate) === _360DEGREE / 2) {
        htmlStr = (
          <>
            <StyledPoint className="point-right" key={`${array[i]} ${i}`}>{array[i]}</StyledPoint>
            <StyledPoint className="point-left rooter" key={array[i + halfLength]}>{array[i + halfLength]}</StyledPoint>
          </>
        )
      } else {
        htmlStr = (
          <>
            <StyledPoint className="point-right" key={`${array[i]} ${i}`}>{array[i]}</StyledPoint>
            <StyledPoint className="point-left" key={array[i + halfLength]}>{array[i + halfLength]}</StyledPoint>
          </>
        )
      }

      points.push(
        <StyledPoints key={i} style={{transform: 'translate(-50%, -50%) rotate(' + rotate + 'deg)',
          width: size + 'px'}}>
          {htmlStr}
        </StyledPoints>
      )

      rotate -= rotateDegree

    }
    return points
  }

  render() {
    return (
      <StyledPointsWrapper>
        <StyledPlate style={{width: this.props.size + 'px', height: this.props.size + 'px'}}>
          {this.renderPlate()}
        </StyledPlate>
      </StyledPointsWrapper>
    )
  }
}

export default Plate
