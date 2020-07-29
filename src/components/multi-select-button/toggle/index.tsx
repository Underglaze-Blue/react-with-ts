import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 0;
  width: 72px;
`

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
      <StyledButton type={isSelect ? 'primary' : 'default'} onClick={this._toggle}>{this.props.content}</StyledButton>
    )
  }
}

export default ToggleButton
