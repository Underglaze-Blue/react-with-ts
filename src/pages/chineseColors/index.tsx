import React, {Component} from 'react'
import {fetchColors} from "../../api";
import {Colors} from '../../type'
import {colorsSort} from './utils'

interface IColorsProps {

}

interface IColorsState {
  colors: Array<Colors>
}


class ChineseColors extends Component<IColorsProps, IColorsState>{
  constructor(props: IColorsProps) {
    super(props)
    this.state = {
      colors: []
    }
  }

  handleGetColors = () => {
    fetchColors().then(res => {
      this.setState({
        colors: colorsSort(res as Array<Colors>)
      })
      console.log(this.state.colors)
    })
  }

  componentDidMount() {
    this.handleGetColors()
  }

  render() {
    return 'CHINESE COLORS';
  }
}

export default ChineseColors
