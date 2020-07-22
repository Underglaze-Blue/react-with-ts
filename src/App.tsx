import React, {Component} from 'react'
import styled from "styled-components"
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Switch, Router, Route, Redirect } from 'react-router'
import { createBrowserHistory, History } from 'history'
import IGallery from "./pages/gallery"
import LibraryApp from './pages/library'
import UserApp from './pages/user'
import Poetry from "./pages/poetry"
import Menu from './pages/menu'

const StyledApp = styled.div`
  text-align: center;
  background-color: #495c69;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
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
        <StyledApp>
          <Redirect to='menu'/>
          <Switch>
            <Route path="/menu" exact component={Menu} />
            <Route path="/gallery" exact component={IGallery} />
            <Route path="/library" exact component={LibraryApp} />
            <Route path="/user" exact component={UserApp} />
            <Route path="/poetry" exact component={Poetry} />
          </Switch>
        </StyledApp>
      </Router>
    )
  }
}

export default App
