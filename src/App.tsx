import React, {Component} from 'react'
import Create from "./pages/gallery/create"
import Gallery from "./pages/gallery/gallery"
import './App.css'
import Poetry from "./pages/poetry/poetry";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  width: 100vw;
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <StyledHeader className="App-header">
          <Poetry />
          <Create message="Click Button Create Gallery"/>
        </StyledHeader>
        <main>
          <Gallery />
        </main>
      </div>
    );
  }
}

export default App;
