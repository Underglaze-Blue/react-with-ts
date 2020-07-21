import React, { Component, FormEvent } from 'react'
import {Input, Badge, Button} from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import actions from '../../store/actionCreators'
import {fetchRandomImage} from '../../api'
import {ImageResult} from '../../models'
import { connect } from 'react-redux'
import styled from "styled-components";

interface IHelloProps {
  message?: string
  imageStore?: Array<string>,
  AddImage: (url: string) => void,
  RemoveImage: () => void
}

interface IHelloState {
  message: string | undefined
  loading: boolean
}

const StyledButton = styled(Button)`
  margin: 0 16px;
  width: 54px;
  .anticon, 
  .anticon-loading, 
  .ant-btn-loading-icon{
    padding-right: 0!important;
  }
`

class Create extends Component<IHelloProps, IHelloState> {
  constructor(props: IHelloProps) {
    super(props)
    this.state = {
      message: props.message,
      loading: false
    }
  }
  static defaultProps = {
    message: 'defaultMessage'
  }
  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      message: (e.target as HTMLInputElement).value
    })
  }
  handleButtonClick = (type: boolean | null) => {
    if (type) {
      this.setState({
        loading: true
      })
      fetchRandomImage().then(res => {
        const {img} = res as ImageResult
        this.props.AddImage(img)
      }).finally(() => {
        this.setState({
          loading: false
        })
      })
      return
    }
    this.props.RemoveImage()
  }
  render() {
    let count = (this.props.imageStore as Array<string>).length
    return (
      <article>
        <h1 className="color-white">{this.state.message}{count >= 5 && '🐂🍺'}...</h1>
        <Badge showZero count={count}>
          <h2 className="color-white">Button click count..</h2>
        </Badge>
        <aside style={{display: "flex"}}>
          <StyledButton type="primary" danger disabled={count <= 0} onClick={() => {
            this.handleButtonClick(false)
          }}>
            <MinusOutlined />
          </StyledButton>
          <Input value={this.state.message} placeholder="React demo ..." allowClear maxLength={10} type="text" onChange={this.handleChange}/>
          <StyledButton loading={this.state.loading} disabled={count >= 9} type="primary" onClick={() => {
            this.handleButtonClick(true)
          }}>
            <PlusOutlined style={{display: this.state.loading ? 'none' : ''}} />
          </StyledButton>
        </aside>
      </article>
    )
  }
}

export default connect(state => state, actions)(Create)
