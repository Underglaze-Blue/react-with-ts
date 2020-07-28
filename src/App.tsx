import React, {Component, ComponentClass} from 'react'
import styled from "styled-components"
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {Switch, Router, Route, Redirect} from 'react-router'
import { createBrowserHistory, History } from 'history'
import IGallery from "./pages/gallery"
import LibraryApp from './pages/library'
import UserApp from './pages/user'
import Poetry from "./pages/poetry"
import Menu from './pages/menu'
import ChineseColors from './pages/chineseColors'
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
  filter: blur(2px);
  -webkit-filter: blur(2px);
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

interface RouteTypes {
  path: string
  component: React.ComponentClass
}

const Routes: Array<RouteTypes> = [
  {
    path: "/menu",
    component: Menu
  },
  {
    path: "/gallery",
    component: IGallery
  },
  {
    path: "/library",
    component: LibraryApp
  },
  {
    path: "/user",
    component: UserApp
  },
  {
    path: "/poetry",
    component: Poetry
  },
  {
    path: "/cn-colors",
    component: ChineseColors
  },
]

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
      this.setState({
        bgImage: ((res as PromiseImage).images)[parseInt(String(Math.random() * ImageCount))].url
      })
    })
  }

  _renderRoute = (routes: Array<RouteTypes>): React.ReactNode => {
    return routes.map(item => {
      return <Route path={item.path} exact component={item.component} key={item.path}/>
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
          <Switch>
            {this._renderRoute(Routes)}
            <Redirect exact from="/" to="menu" />
          </Switch>
        </StyledApp>
      </Router>
    )
  }
}

export default App
