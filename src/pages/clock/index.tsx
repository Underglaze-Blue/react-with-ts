import React,{Component} from 'react'
import Plate from './components/plate'

import {DAYS, HOURS, MINS, MONTHS, SECS, WEEKS} from './utils/date'

interface IClockProps {

}

interface IClockState {
  date: Date
}

class Clock extends Component<IClockProps, IClockState> {
  timerID: number
  constructor(props: IClockProps) {
    super(props)
    this.state = {
      date: new Date()
    }
    this.timerID = 0
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  tick() {
    this.setState({
      date: new Date()
    })
  }
  render() {
    // const whatWeek = Math.ceil((21 + 1) / WEEKS.length)

    return (
      <>
        <Plate array={MONTHS} size={170} currentTime={this.state.date.getMonth()} />
        <Plate array={WEEKS} size={330} currentTime={this.state.date.getDay()} />
        <Plate array={DAYS} size={460} currentTime={this.state.date.getDate()} />
        <Plate array={HOURS} size={560} currentTime={this.state.date.getHours()} />
        <Plate array={MINS} size={680} currentTime={this.state.date.getMinutes()} />
        <Plate array={SECS} size={800} currentTime={this.state.date.getSeconds()} />
      </>
    )
  }
}

export default Clock

