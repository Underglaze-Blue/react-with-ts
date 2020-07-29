import React from 'react'
import MultipleSelectButton, { MultipleButtonProps } from '../../../components/multi-select-button'

interface IDelayProps {

}
interface IDelayState {
  months: MultipleButtonProps[]
  days: MultipleButtonProps[]
}

class Delay extends React.Component<IDelayProps, IDelayState>{
  constructor(props: IDelayProps) {
    super(props)
    this.state = {
      months: [{
        name: '一月',
        value: 'January'
      }, {
        name: '二月',
        value: 'February'
      }, {
        name: '三月',
        value: 'March'
      }, {
        name: '四月',
        value: 'April'
      }, {
        name: '五月',
        value: 'May'
      }, {
        name: '六月',
        value: 'June'
      }],
      days: [{
        name: '星期日',
        value: 'Sunday'
      }, {
        name: '星期一',
        value: 'Monday'
      }, {
        name: '星期二',
        value: 'Tuesday'
      }, {
        name: '星期三',
        value: 'Wednesday'
      }, {
        name: '星期四',
        value: 'Thursday'
      }, {
        name: '星期五',
        value: 'Friday'
      },{
        name: '星期六',
        value: 'Saturday'
      }]
    }
  }

  render() {
    const { months, days } = this.state
    return (
      <div>
        <MultipleSelectButton items={months} onChange={(value, selected) => {console.log(value, selected)}}/>
        <MultipleSelectButton items={days} />
      </div>
    )
  }
}
export default Delay
