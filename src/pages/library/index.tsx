import React, {Component} from 'react'
import { 
  Row, 
  Col,
  Input 
} from 'antd'
import styled from 'styled-components'
import { StoreValue } from 'antd/lib/form/interface'
import ImageInfo from './component/image-info'
import ChannelSwitcher from './component/channel-switcher'


const WorkSpace = styled.div`
`
const Label = styled.div`
`

interface IUserAppProps {

}
interface IUserAppState {

}

class LibraryApp extends Component<IUserAppProps, IUserAppState> {

  _onImageInfoChange = (changedValues: StoreValue, allValues: StoreValue) => {
    console.log(changedValues, allValues)
  }

  render() {
    return (
      <WorkSpace>
        <ImageInfo data={{R: 100, G: 50, B: 30}} onImageInfoChange={this._onImageInfoChange}/>
        <ChannelSwitcher />
      </WorkSpace>
    )
  }
}

export default LibraryApp