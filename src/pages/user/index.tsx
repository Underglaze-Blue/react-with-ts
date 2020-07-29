import React, { Component } from 'react'
import Delay from './timed-job/delay'

interface IUserAppProps {

}
interface IUserAppState {

}

class UserApp extends Component<IUserAppProps, IUserAppState> {

  render() {
    return (
      <div><Delay /></div>
    )
  }
}

export default UserApp
