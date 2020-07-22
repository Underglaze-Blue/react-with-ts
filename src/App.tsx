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
import {fetchBingHPImageArchive} from './api'

const ImageCount = 8

const StyledApp = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
`

const StyledBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  &::before{
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: rgba(0,0,0,.5);
    z-index: 1;
    width: 100%;
    height: 100%;
  }
`

interface IAppProps {

}
interface IAppState {
  history: History,
  bgImage: string
}

interface PromiseImage {
  images: Array<BgImage>
}

interface BgImage {
  url: string
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      history: createBrowserHistory(),
      bgImage: ''
    }
  }

  componentDidMount() {
    fetchBingHPImageArchive(ImageCount).then(res => {
      console.log(res)
      this.setState({
        bgImage: ((res as PromiseImage).images)[parseInt(String(Math.random() * ImageCount))].url
      })
    })
  }

  render() {
    const { history } = this.state
    const styleApp = {
      backgroundImage: `url(https://cn.bing.com${this.state.bgImage})`
    }
    return (
      <Router history={history}>
        <StyledApp >
          <StyledBackground style={styleApp}/>
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
