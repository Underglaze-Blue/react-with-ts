import React, {Component} from 'react'
import {
  Form,
  Switch
} from 'antd'
import styled from 'styled-components'
import { StoreValue } from 'antd/lib/form/interface'

const InfoApp = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #40a9ff;
  padding: 16px;
`
interface IChannelSwitcher {
  RChannel: boolean
  GChannel: boolean
  BChannel: boolean
}

interface IImageInfoProps {
  data?: IChannelSwitcher
  onImageInfoChange?: (changedValues: StoreValue, allValues: StoreValue) => void
}
interface IImageInfoState {
  data: IChannelSwitcher
}

class ChannelSwitcher extends Component<IImageInfoProps, IImageInfoState> {
  defaultProps: IChannelSwitcher = {
    RChannel: true,
    GChannel: true,
    BChannel: true
  }

  constructor(props: IImageInfoProps) {
    super(props)
    const { data } = this.props
    this.state = {
      data: (data as IChannelSwitcher)
    }
  }


  _onValuesChange = (changedValues: StoreValue, allValues: StoreValue) => {
    const { onImageInfoChange } = this.props
    onImageInfoChange && onImageInfoChange(changedValues, allValues)
  }

  render() {
    const { data } = this.state
    console.log(data)
    return (
      <InfoApp>
        <Form initialValues={data} onValuesChange={this._onValuesChange}>
          <Form.Item label="R channel" name="RChannel" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="G channel" name="GChannel" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="B channel" name="BChannel" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </InfoApp>
    )
  }
}

export default ChannelSwitcher
