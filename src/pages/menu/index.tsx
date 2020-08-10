import React, {Component} from 'react'
import styled from 'styled-components'
import {createBrowserHistory, History} from 'history'
import { withRouter, RouteComponentProps } from 'react-router'
import {randomBackgroundColor} from './utils'
import {fetchColors} from '../../api'
import {Colors} from '../../type'

type IMenuProps = RouteComponentProps

interface IMenuState {
  history: History,
  colors: Array<Colors>
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
  },
  {
    name: 'Chinese Colors',
    path: 'cn-colors'
  },
  {
    name: 'Canvas \n&\n Others',
    path: 'other'
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
  justify-content: space-around;
  li{
    list-style: none;
    .ant-btn{
      font-size: calc(10px + 2vmin);
    }
  }
`

const StyledLi = styled.li`
  -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent,transparent,rgba(255,255,255,.3));
  box-sizing: border-box;
  opacity: 0.85;
  height: 30vh;
  white-space: pre-line;
  flex: 1;
  width: 20vh;
  margin: 2vmin;
  border-radius: 1vh;
  box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: scale(1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  div{
    text-shadow: 0px 1px 0px #c0c0c0,
                0px 1.5px 0px #b0b0b0,
                0px 2px 0px #a0a0a0,
                0px 2.5px 0px #909090,
                0px 3px 5px rgba(0, 0, 0, 0.6);
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 4px 6px 20px rgba(0, 0, 0, 0.3);
    opacity: 0;
  }
  &:hover{
    transform: scale(1.05, 1.05);
    ::before{
      opacity: 1;
    } 
  }
`

class Menu extends Component<IMenuProps, IMenuState>{
  constructor(props:IMenuProps) {
    super(props)
    this.state = {
      history: createBrowserHistory(),
      colors: []
    }
  }

  // 获取颜色
  handleGetColors = () => {
    fetchColors().then(res => {
      this.setState({
        colors: res as Array<Colors>
      })
    })
  }

  componentDidMount() {
    this.handleGetColors()
  }

  handleJump = (path: string) => {
    this.props.history.push(path)
  }

  // 渲染菜单列表
  _renderMenuList = (): React.ReactElement[] => {
    return MenuList.map(item => {
      const color = randomBackgroundColor(item.name, this.state.colors as Array<Colors>)
      const liStyle = {
        backgroundImage: `linear-gradient(to bottom right, ${color[0].hex} , ${color[1].hex})`
      }
      return (
        <StyledLi style={liStyle} key={item.path} onClick={() => {this.handleJump(item.path)}}>
          <div>{item.name}</div>
        </StyledLi>
      )
    })
  }

  render() {
    return (
      this.state.colors.length > 0 && <StyledMain>
        <StyledUl>
          {this._renderMenuList()}
        </StyledUl>
      </StyledMain>
    )
  }
}

export default withRouter(Menu)
