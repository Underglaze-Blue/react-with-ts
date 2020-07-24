import React, {Component} from 'react'

interface IColorInfoProps {

}

interface IColorInfoState {

}

class ColorInfo extends Component<IColorInfoProps, IColorInfoState>{
  render() {
    return <h1 style={{flex: 1}}>'Color Information'</h1>;
  }
}

export default ColorInfo
