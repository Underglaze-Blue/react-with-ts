import React, {Component, FormEvent} from 'react'
import { Input, Button, Badge } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import Gallery from './gallery'
import { ImageUrl } from '../models'
import {fetchRandomImage} from '../api'

const StyledButton = styled(Button)`
  margin: 0 16px;
`

interface IHelloProps {
  message?: string
  count?: number
}

interface IHelloState {
  imageItems: ImageUrl[]
  message: string | undefined
  count: number
}

class Hello extends Component<IHelloProps, IHelloState> {
  constructor(props: IHelloProps) {
    super(props)
    this.state = {
      message: props.message,
      count: props.count as number,
      imageItems: ['https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302']
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
    const { count, imageItems } = this.state
    console.log(fetchRandomImage())
    type ? imageItems.push('https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302') : imageItems.pop()
    this.setState({
      count: type ? count + 1 : count - 1,
      imageItems
    })
  }
  render() {
    const { imageItems } = this.state
    return (
      <article>
        <h1 className="color-white">{this.state.message}{this.state.count >= 10 && '🐂🍺'}...</h1>
        <Badge showZero count={this.state.count}>
          <h2 className="color-white">Button click count..</h2>
        </Badge>
        <aside style={{display: "flex"}}>
          <StyledButton type="primary" danger disabled={this.state.count <= 0} onClick={() => {this.handleButtonClick(false)}}>
            <MinusOutlined />
          </StyledButton>
          <Input value={this.state.message} placeholder="React demo ..." allowClear maxLength={10} type="text" onChange={this.handleChange}/>
          <StyledButton type="primary" onClick={() => {this.handleButtonClick(true)}}>
            <PlusOutlined />
          </StyledButton>
        </aside>
        <div>
          <Gallery items={imageItems}/>
        </div>
      </article>
    )
  }
}

export default Hello
