import React, {Component, ComponentClass} from 'react'
import Ribbon from './components/ribbon'
import Line from './components/line'
import CanvasLoading from './components/loading'
import Microscopic from './components/microscopic'
import Tree from './components/tree'
import {Switch, Router, Route, Redirect} from 'react-router'

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
    path: '/canvas/menu',
    component: Menu
  },
  {
    path: '/canvas/line',
    component: Line
  },
  {
    path: '/canvas/ribbon',
    component: Ribbon
  },
  {
    path: '/canvas/loading',
    component: CanvasLoading
  },
  {
    path: '/canvas/microscopic',
    component: Microscopic
  },
  {
    path: '/canvas/tree',
    component: Tree
  }
]

const StyledMain = styled.main`
  width: 100vw;
  height: 100vh;
`


class CanvasBg extends Component<ICanvasBgProps, ICanvasBgStates> {
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
          <Redirect exact from="/canvas" to="/canvas/menu" />
        </Switch>
      </StyledMain>
    )
  }
}

export default CanvasBg
