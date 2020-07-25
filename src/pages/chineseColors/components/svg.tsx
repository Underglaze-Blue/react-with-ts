import React,{PureComponent} from 'react'
import styled from "styled-components";

interface ICircleProps {
  percent: number
  color: string
}

interface ICircleState {
  perimeter: number
  radius: number
  strokeDashoffset: number
}

const StyledSVG = styled.svg`
  circle {
    stroke-dashoffset: 0;
    transition: all 15s linear;
    stroke: rgba(54,52,51,.1);
    stroke-width: 6px;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    &.bar{
      stroke: #FF9F1E;
      strokeDashoffset: 0;
    }
  }
`

const StyledSVGWrapper = styled.div`
  display: block;
  height: 80px;
  width: 80px;
  border-radius: 100%;
  position: relative;
  &:after {
    position: absolute;
    display: block;
    height: 80px;
    width: 80px;
    left: 50%;
    top: 50%;
    content: attr(data-percent);
    margin-top: -40px;
    margin-left: -40px;
    border-radius: 100%;
    line-height: 80px;
    font-size: 14px;
}

`

class CircleSVG extends PureComponent<ICircleProps, ICircleState>{
  constructor(props: ICircleProps) {
    super(props);
    const radius = 35
    const perimeter = Math.PI * 2 * radius
    this.state = {
      perimeter,
      radius,
      strokeDashoffset: perimeter - this.props.percent / 100 * perimeter
    }
  }
  render() {
    return (
      <>
        <StyledSVGWrapper data-percent={this.props.percent}>
          <StyledSVG id="svg" width="80" height="80">
            <circle r={this.state.radius} cx="40" cy="40" fill="transparent" strokeDasharray={this.state.perimeter} strokeDashoffset="0"></circle>
            <circle style={{strokeDashoffset: this.state.strokeDashoffset, stroke: this.props.color}} className="bar" r={this.state.radius} cx="40" cy="40" fill="transparent" strokeDasharray={this.state.perimeter} strokeDashoffset="0"></circle>
          </StyledSVG>
        </StyledSVGWrapper>
      </>
    );
  }
}

export default CircleSVG
