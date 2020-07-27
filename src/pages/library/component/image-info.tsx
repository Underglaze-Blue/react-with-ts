import React, {Component} from 'react'
import {
  Form,
  InputNumber  
} from 'antd'
import styled from 'styled-components'
import { StoreValue } from 'antd/lib/form/interface'

const InfoApp = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #40a9ff;
  padding: 16px;
`
interface IPixel {
  R: number
  G: number
  B: number
  alpha?: number
}

interface IImageInfoProps {
  data: IPixel
  onImageInfoChange?: (changedValues: StoreValue, allValues: StoreValue) => void
}
interface IImageInfoState {
  data: IPixel
}

class ImageInfo extends Component<IImageInfoProps, IImageInfoState> {
  constructor(props: IImageInfoProps) {
    super(props)
    const { data } = this.props
    data.alpha = data.alpha || 1
    this.state = {
      data
    }
  }

  _onValuesChange = (changedValues: StoreValue, allValues: StoreValue) => {
    const { onImageInfoChange } = this.props
    onImageInfoChange && onImageInfoChange(changedValues, allValues)
  }

  render() {
    const { data } = this.state
    return (
      <InfoApp>
          <Form initialValues={data} onValuesChange={this._onValuesChange}>
            <Form.Item label="R" name="R">
              <InputNumber min={0} max={255} step={1} />
            </Form.Item>
            <Form.Item label="G" name="G">
              <InputNumber min={0} max={255} step={1} />
            </Form.Item>
            <Form.Item label="B" name="B">
              <InputNumber min={0} max={255} step={1} />
            </Form.Item>
            <Form.Item label="A" name="alpha">
              <InputNumber min={0} max={1} step={0.01} />
            </Form.Item>
        </Form>
      </InfoApp>
    )
  }
}

export default ImageInfo