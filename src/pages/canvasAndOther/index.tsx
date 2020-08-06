import React, {Component, ComponentClass} from 'react'
import Ribbon from './components/ribbon'
import Line from './components/line'
import CanvasLoading from './components/loading'
import Microscopic from './components/microscopic'
import Tree from './components/tree'
import Clock from './components/clock'
import {Switch, Route, Redirect} from 'react-router'

import Menu from './menu'
import styled from 'styled-components'

interface ICanvasBgProps {

}

interface ICanvasBgStates {
  child: this
}

interface RouteTypes {
  path: string
  component: ComponentClass
}

const Routes: Array<RouteTypes> = [
  {
    path: '/other/menu',
    component: Menu
  },
  {
    path: '/other/line',
    component: Line
  },
  {
    path: '/other/ribbon',
    component: Ribbon
  },
  {
    path: '/other/loading',
    component: CanvasLoading
  },
  {
    path: '/other/microscopic',
    component: Microscopic
  },
  {
    path: '/other/tree',
    component: Tree
  },
  {
    path: '/other/clock',
    component: Clock
  }
]

const StyledMain = styled.main`
  width: 100vw;
  height: 100vh;
`


class Other extends Component<ICanvasBgProps, ICanvasBgStates> {
  static canvas = React.createRef<HTMLCanvasElement>()

  _renderRoute = (routes: Array<RouteTypes>): React.ReactNode => {
    return routes.map(item => {
      return <Route path={item.path} exact component={item.component} key={item.path}/>
    })
  }

  render() {
    return (
      <StyledMain>
        <Switch>
          {this._renderRoute(Routes)}
          <Redirect exact from="/other" to="/other/menu" />
        </Switch>
      </StyledMain>
    )
  }
}

export default Other
