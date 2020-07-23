import React, {Component} from "react";

import styled, {keyframes} from "styled-components";

interface ILoadingProps {

}

interface ILoadingState {

}

const keyframesMove = keyframes`
    0% { transform: translate(12px,80px) scale(0); }
    25% { transform: translate(12px,80px) scale(0); }
    50% { transform: translate(12px,80px) scale(1); }
    75% { transform: translate(80px,80px) scale(1); }
    100% { transform: translate(148px,80px) scale(1); }
`

const keyframeScale = keyframes`
    0% { transform: translate(148px,80px) scale(1) }
    100% { transform: translate(148px,80px) scale(0); }
`

const keyframeBgColor = keyframes`
    0% { background: #ffb6bb }
    25% { background: #585872 }
    50% { background: #95d5ee }
    75% { background: #ffe691 }
    100% { background: #ffb6bb }
`

const StyledLoadingWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background: aliceblue;
`

const StyledDivWrapper = styled.div`
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
`

const StyledDivMain = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
  div { 
    box-sizing: content-box;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transform: translate(80px,80px) scale(1);
    background: #ffb6bb;
    animation: ${keyframesMove} 2s infinite cubic-bezier(0,0.5,0.5,1); 
    &:nth-child(1) {
      background: #ffe691;
      transform: translate(148px,80px) scale(1);
      animation: ${keyframeScale} 0.4807692307692307s infinite cubic-bezier(0,0.5,0.5,1), ${keyframeBgColor} 1.923076923076923s infinite step-start;
    }
    &:nth-child(2) {
      animation-delay: -0.4807692307692307s;
      background: #ffb6bb;
    } 
    &:nth-child(3) {
      animation-delay: -0.9615384615384615s;
      background: #ffe691;
    }
    &:nth-child(4) {
      animation-delay: -1.4423076923076923s;
      background: #95d5ee;
    }
    &:nth-child(5) {
      animation-delay: -1.923076923076923s;
      background: #585872;
    }
  }
`

class Loading extends Component<ILoadingProps, ILoadingState>{
  render() {
    return (
      <StyledLoadingWrapper>
        <StyledDivWrapper>
          <StyledDivMain>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </StyledDivMain>
        </StyledDivWrapper>
      </StyledLoadingWrapper>
    )
  }
}

export default Loading
