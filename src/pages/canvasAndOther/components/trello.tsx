import React, {Component} from 'react'
import styled from 'styled-components'

// Import main Board component
import Board from './trello/board'

interface ITrelloProps {

}

interface ITrelloState {

}

// Use createGlobalStyle to change the background of 'body' element
const BoardWrapper = styled.div`
  background-color: #4bcffa;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 2vmin;
`

// Create component for the page

class Trello extends Component<ITrelloProps, ITrelloState>{
  render() {
    return (
      <BoardWrapper>
        <Board />
      </BoardWrapper>
    )
  }
}

export default Trello
