import React, { Component, FormEvent } from 'react'
import { Input, Button, Badge } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { AddImage, RemoveImage } from '../store/image-reducer'
import {fetchRandomImage} from '../api'
import {ImageResult} from '../models'

const StyledButton = styled(Button)`
  margin: 0 16px;
`

interface IHelloProps {
  message?: string
  count?: number
}

interface IHelloState {
  message: string | undefined
  count: number,
  loading: boolean
}

class Hello extends Component<IHelloProps, IHelloState> {
  constructor(props: IHelloProps) {
    super(props)
    this.state = {
      message: props.message,
      count: props.count as number,
      loading: false
    }
  }
  static defaultProps = {
    message: 'defaultMessage',
    count: 0
  }
  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      message: (e.target as HTMLInputElement).value
    })
  }
  handleButtonClick = (type: boolean | null) => {
    const { count } = this.state
    this.setState({
      count: type ? count + 1 : count - 1
    })
    if (type) {
      this.setState({
        loading: true
      })
      fetchRandomImage().then(res => {
        const {img} = res as ImageResult
        AddImage(img)
      }).finally(() => {
        this.setState({
          loading: false
        })
      })
      return
    }
    RemoveImage()
  }
  render() {
    return (
      <article>
        <h1 className="color-white">{this.state.message}{this.state.count >= 10 && '🐂🍺'}...</h1>
        <Badge showZero count={this.state.count}>
          <h2 className="color-white">Button click count..</h2>
        </Badge>
        <aside style={{display: "flex"}}>
          <StyledButton type="primary" danger disabled={this.state.count <= 0} onClick={() => {
            this.handleButtonClick(false)
          }}>
            <MinusOutlined />
          </StyledButton>
          <Input value={this.state.message} placeholder="React demo ..." allowClear maxLength={10} type="text" onChange={this.handleChange}/>
          <StyledButton loading={this.state.loading} disabled={this.state.count >= 9} type="primary" onClick={() => {
            this.handleButtonClick(true)
          }}>
            <PlusOutlined />
          </StyledButton>
        </aside>
      </article>
    )
  }
}

export default Hello
