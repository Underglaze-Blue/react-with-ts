import React, {Component} from 'react'
import {Button} from 'antd'
import styled from "styled-components";
import {createBrowserHistory, History} from 'history'
import { withRouter, RouteComponentProps } from 'react-router'

interface IMenuProps extends RouteComponentProps {

}

interface IMenuState {
  history: History
}

interface MenuItem {
  name: string
  path: string
}

const MenuList: Array<MenuItem> = [
  {
    name: 'Gallery',
    path: 'gallery'
  },
  {
    name: 'Library App',
    path: 'library'
  },
  {
    name: 'User App',
    path: 'user'
  },
  {
    name: 'Poetry',
    path: 'poetry'
  }
]

const StyledMain = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledUl = styled.ul`
  display: flex;
  padding: 0;
  li{
    list-style: none;
    .ant-btn{
      font-size: calc(10px + 2vmin);
    }
  }
`

class Menu extends Component<IMenuProps, IMenuState>{
  constructor(props:IMenuProps) {
    super(props);
    this.state = {
      history: createBrowserHistory()
    }
  }

  handleJump = (path: string) => {
    this.props.history.push(path)
  }

  _renderMenuList  = (): React.ReactElement[] => {
    return MenuList.map(item => {
      return (
        <li key={item.path}>
          <Button danger onClick={() => {this.handleJump(item.path)}} type="link">{item.name}</Button>
        </li>
      )
    })
  }

  render() {
    return (
      <StyledMain>
        <StyledUl>
          {this._renderMenuList()}
        </StyledUl>
      </StyledMain>
    )
  }
}

export default withRouter(Menu)
