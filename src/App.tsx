import React, {Component} from 'react'
import Create from "./pages/gallery/create"
import Gallery from "./pages/gallery/gallery"
import Poetry from "./pages/poetry/poetry";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  margin-top:30px;
`

const StyledApp = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
`

class App extends Component {
  render() {
    return (
      <StyledApp className="App">
        <StyledHeader className="App-header">
          <Poetry />
          <Create message="Click To Create Gallery"/>
        </StyledHeader>
        <main>
          <Gallery />
        </main>
      </StyledApp>
    );
  }
}

export default App;
