import React, {Component, FormEvent} from 'react'
import { Input, Button, Badge } from 'antd';
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
    message: 'defaultMessage',
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
      <article>
        <h1 className="color-white">{this.state.message}...</h1>
        <Badge showZero count={this.state.count}>
          <h2 className="color-white">Button click count..</h2>
        </Badge>
        <aside style={{display: "flex"}}>
          <Button disabled={this.state.count <= 0} type="primary" danger onClick={() => {this.handleButtonClick(false)}}>-</Button>
          <Input placeholder="React demo ..." allowClear maxLength={10} type="text" onChange={this.handleChange}/>
          <Button type="primary" onClick={() => {this.handleButtonClick(true)}}>+</Button>
        </aside>
      </article>
    )
  }
}


export default Hello
