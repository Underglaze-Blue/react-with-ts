import React, {Component} from 'react'
import ImageMask from './components/image'
import styled from 'styled-components'
import {RouteComponentProps, withRouter} from 'react-router'

interface IMenuProps extends RouteComponentProps{

}

interface IMenuState {

}

interface MenuItem {
  name: string
  path: string
  pic?: any
}

const MenuList: Array<MenuItem> = [
  {
    name: 'Line',
    path: 'line',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    pic: require('./image/line.gif')
  },
  {
    name: 'Loading',
    path: 'loading',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    pic: require('./image/loading.gif')
  },
  {
    name: 'Microscopic',
    path: 'microscopic',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    pic: require('./image/microscopic.gif')

  },
  {
    name: 'Ribbon',
    path: 'ribbon',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    pic: require('./image/ribbon.gif')
  },
  {
    name: 'Tree',
    path: 'tree',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    pic: require('./image/tree.gif')
  }
]

const StyleMenuWrapper = styled.ul`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 2vmin;
  font-family: 'Aquamarine';
`


class Menu extends Component<IMenuProps, IMenuState>{

  handleJump(path: string) {
    this.props.history.push(path)
  }

  renderMenuList() {
    return MenuList.map((item, index) => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const requireStr = item.pic ? item.pic : require('./image/default.png')
      return (
        <StyledItem key={item.path} onClick={() => {this.handleJump(item.path)}}>
          <ImageMask width={350} height={240} img={requireStr} delay={index * 500}/>
          <span>{item.name}</span>
        </StyledItem>
      )
    })
  }

  render() {
    return (
      <StyleMenuWrapper>
        {this.renderMenuList()}
      </StyleMenuWrapper>
    )
  }
}

export default withRouter(Menu)
