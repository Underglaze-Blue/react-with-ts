import React from 'react'
import ToggleButton from './toggle'

export type MultipleButtonProps = {
  name: string
  value: any
}
type onChangeFcn = (value: MultipleButtonProps['value'], selected: MultipleButtonProps['value'][]) => void

interface IDelayProps {
  items: MultipleButtonProps[]
  onChange?: onChangeFcn
}
interface IDelayState {
  selected: MultipleButtonProps['value'][]
}

class MultipleSelectButton extends React.Component<IDelayProps, IDelayState>{
  constructor(props: IDelayProps) {
    super(props)
    this.state = {
      selected: []
    }
  }

  _renderMonthsToggle = () => {
    const nodes: React.ReactNode[] = []
    this.props.items.forEach( (item: MultipleButtonProps, index: number) => {
      nodes.push((
        <ToggleButton value={item.value} content={item.name} onClick={(v) => {this._checkSelected(v)}}/>
      ))
    })
    return nodes
  }

  _checkSelected = (value: MultipleButtonProps['value']) => {
    const { selected } = this.state
    const { onChange } = this.props
    const index = selected.indexOf(value)
    const temp = index === -1
      ? selected.concat(value)
      : selected.slice(0, index).concat(selected.slice(index + 1, selected.length))
    this.setState({
      selected: temp
    }, () => {
      onChange && (this.props.onChange as onChangeFcn)(value, this.state.selected)
    })
  }

  render() {
    return (
      <div>
        {this._renderMonthsToggle()}
      </div>
    )
  }
}
export default MultipleSelectButton