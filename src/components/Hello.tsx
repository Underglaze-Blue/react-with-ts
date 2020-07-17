import React, {Component, FormEvent} from 'react'
import { Input, Button } from 'antd';
interface IHelloProps {
  message?: string,
  count?: number
}

interface IHelloState {
  message: string | undefined,
  count: number
}

class Hello extends Component<IHelloProps, IHelloState> {
  constructor(props: IHelloProps) {
    super(props)
    this.state = {
      message: props.message,
      count: props.count as number
    }
  }
  static defaultProps = {
    message: 'test',
    count: 0
  }
  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      message: (e.target as HTMLInputElement).value
    })
  }
  handleButtonClick = (type: boolean | null) => {
    this.setState({
      count: type ? this.state.count + 1 : this.state.count - 1
    })
  }
  render() {
    return (
      <div>
        <h1 style={{color:'#fff'}}>{this.state.message}...  click: {this.state.count}</h1>
        <div style={{display: "flex"}}>
          <Button type="primary" danger onClick={() => {this.handleButtonClick(false)}}>-</Button>
          <Input type="text" onChange={this.handleChange}/>
          <Button type="primary" onClick={() => {this.handleButtonClick(true)}}>+</Button>
        </div>
      </div>
    )
  }
}


export default Hello
