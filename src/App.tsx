import React, {Component} from 'react'
import Create from "./pages/gallery/create"
import Gallery from "./pages/gallery/gallery"
import LibraryApp from './pages/library'
import UserApp from './pages/user'
import Poetry from "./pages/poetry/poetry"
import styled from "styled-components"
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Switch, Router, Route } from 'react-router'
import { createBrowserHistory, History } from 'history'
import { Button } from 'antd'

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
const Main = styled.main`
  width: 100%;
  height: 800px;
`
interface IAppProps {

}
interface IAppState {
  history: History
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      history: createBrowserHistory()
    }
  }

  render() {
    const { history } = this.state
    return (
      <Router history={history}>
        <StyledApp className="App">
          <StyledHeader className="App-header">
            <h2>Router Demo</h2>
            <Create message="Click To Create Gallery"/>
          <ul>
            <li><Button onClick={ () => {history.push('/gallery')}}>Gallery</Button></li>
            <li><Button onClick={ () => {history.push('/library')}}>Library App</Button></li>
            <li><Button onClick={ () => {history.push('/user')}}>User App</Button></li>
            <li><Button onClick={ () => {history.push('/poetry')}}>Poetry</Button></li>
          </ul>
          </StyledHeader>
          <Main>
            <Switch>
              <Route path="/gallery" exact component={Gallery} />
              <Route path="/library" exact component={LibraryApp} />
              <Route path="/user" exact component={UserApp} />
              <Route path="/poetry" exact component={Poetry} />
            </Switch>
          </Main>
        </StyledApp>
      </Router>
    )
  }
}

export default App
