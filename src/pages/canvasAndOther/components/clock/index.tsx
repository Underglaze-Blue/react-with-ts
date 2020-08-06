import React, {Component} from 'react'
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
    this.tick()
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.timerID)
  }
  tick() {
    this.setState({
      date: new Date()
    })
    this.timerID = requestAnimationFrame(() => {this.tick()})
  }
  render() {

    return (
      <>
        <Plate array={WEEKS} size={200} currentTime={this.state.date.getDay()} />
        <Plate array={MONTHS} size={320} currentTime={this.state.date.getMonth()} />
        <Plate array={DAYS} size={440} currentTime={this.state.date.getDate()} />
        <Plate array={HOURS} size={560} currentTime={this.state.date.getHours()} />
        <Plate array={MINS} size={680} currentTime={this.state.date.getMinutes()} />
        <Plate array={SECS} size={800} currentTime={this.state.date.getSeconds()} />
      </>
    )
  }
}

export default Clock

