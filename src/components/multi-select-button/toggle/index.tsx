import React from 'react'
import { Button } from 'antd'

type valueType = any

interface IToggleButtonProps {
  content: any
  value: valueType
  onClick: (value: valueType) => void
}

interface IToggleButtonState {
  isSelect: boolean
}

class ToggleButton extends React.Component<IToggleButtonProps, IToggleButtonState> {

  constructor(props: IToggleButtonProps) {
    super(props)
    this.state = {
      isSelect: false
    }
  } 
  
  _toggle = () => {
    this.setState({
      isSelect: !this.state.isSelect
    })
    this.props.onClick(this.props.value)
  }

  render() {
    const { isSelect } = this.state
    return (
      <Button type={isSelect ? 'primary' : 'default'} onClick={this._toggle}>{this.props.content}</Button>
    )
  }
}

export default ToggleButton