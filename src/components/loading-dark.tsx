import React, {Component} from 'react'
import styled, {keyframes} from 'styled-components'

interface IDarkProps {

}

interface IDarkState {

}

const spin = keyframes`
   to {
      transform: rotate(1turn);
   }
`

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLoading = styled.aside`
  position: relative;
  width: 8em;
  height: 8em;
  background: black;
  border-radius: 50%;
  box-shadow: inset 0.1em -0.5em crimson;
  animation: ${spin} 2.5s linear infinite;
  
  &::before,
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: inherit;
    border-radius: inherit;
    box-shadow: inherit;
  }

  &::before {
    filter: blur(5px);
  }

  &::after {
    filter: blur(10px);
  }
`

class LoadingDark extends Component<IDarkProps, IDarkState>{
  render() {
    return (
      <StyledWrapper>
        <StyledLoading />
      </StyledWrapper>
    )
  }
}

export default LoadingDark
