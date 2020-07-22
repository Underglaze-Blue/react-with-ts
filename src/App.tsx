import React, {Component} from 'react'
import Create from "./pages/gallery/create"
import Gallery from "./pages/gallery/gallery"
import LibraryApp from './pages/library'
import UserApp from './pages/user'
import Poetry from "./pages/poetry/poetry"
import styled from "styled-components"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

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
      <Router>
        <StyledApp className="App">
          <StyledHeader className="App-header">
            <Poetry />
            <Create message="Click To Create Gallery"/>
          </StyledHeader>
          <main>
            <ul>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/library">Library</Link></li>
              <li><Link to="/user">User</Link></li>
            </ul>
          </main>

          <Route path="/gallery" exact component={Gallery} />
          <Route path="/library" exact component={LibraryApp} />
          <Route path="/user" component={UserApp} />
        </StyledApp>
      </Router>
    )
  }
}

export default App;
