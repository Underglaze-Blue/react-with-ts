import React, {Component, ComponentClass} from 'react'
import styled from 'styled-components'
import {Switch, Router, Route, Redirect} from 'react-router'
import { createBrowserHistory, History } from 'history'

import IGallery from './pages/gallery'
import LibraryApp from './pages/library'
import UserApp from './pages/user'
import Poetry from './pages/poetry'
import Menu from './pages/menu'
import ChineseColors from './pages/chineseColors'
import Other from './pages/canvasAndOther'

import {fetchBingHPImageArchive} from './api'
import LocalData from './utils/storage'
import {LocalStorageType} from './type'

import { debounce } from 'lodash'

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
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  filter: blur(2px);
  -webkit-filter: blur(2px);
  transition: background-image 0.5s;
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

interface IAppProps {}
interface IAppState {
  history: History,
  bgImage: string,
  index: number
}

interface PromiseImage {
  images: Array<BgImage>
}

interface BgImage {
  url: string
}

interface RouteTypes {
  path: string
  component: ComponentClass,
  fuzzy?: boolean
}

const Routes: Array<RouteTypes> = [
  {
    path: '/menu',
    component: Menu
  },
  {
    path: '/gallery',
    component: IGallery
  },
  {
    path: '/library',
    component: LibraryApp
  },
  {
    path: '/user',
    component: UserApp
  },
  {
    path: '/poetry',
    component: Poetry
  },
  {
    path: '/cn-colors',
    component: ChineseColors
  },
  {
    path: '/other',
    component: Other,
    fuzzy: true
  }

]

class App extends Component<IAppProps, IAppState> {
  backgroundRandom: Function
  storage: LocalStorageType
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      history: createBrowserHistory(),
      bgImage: '',
      index: 0
    }
    this.storage = new LocalData()
    this.backgroundRandom = debounce(this.randomBackgroundImage, 500)
  }

  componentDidMount() {
    this.setState({
      index: this.randomIndex()
    }, () => {
      if (this.storage.get('images') && this.storage.get('images').length) {
        this.setState({
          bgImage: this.storage.get('images')[this.state.index].url
        })
        return
      }
      fetchBingHPImageArchive(ImageCount).then(res => {
        const images = (res as PromiseImage).images
        const period = new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0))
        this.storage.save('images', images, period)
        this.setState({
          bgImage: images[this.state.index].url
        })
      })
    })
    setInterval(() => {
      this.randomBackgroundImage()
    }, 1000 * 30)
  }

  _renderRoute = (routes: Array<RouteTypes>): React.ReactNode => {
    return routes.map(item => {
      return <Route path={item.path} exact={!item.fuzzy} component={item.component} key={item.path}/>
    })
  }

  randomIndex(): number {
    return Math.random() * ImageCount >> 0
  }

  randomBackgroundImage() {
    let index = this.randomIndex()
    while (index === this.state.index) {
      index = this.randomIndex()
    }
    this.setState({
      index,
      bgImage: this.storage.get('images')[index].url
    })
  }

  render() {
    const { history } = this.state
    const styleApp = {
      backgroundImage: `url(https://cn.bing.com${this.state.bgImage})`
    }
    return (
      <Router history={history}>
        <StyledApp>
          <StyledBackground style={styleApp} onClick={() => {this.backgroundRandom()}}/>
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
