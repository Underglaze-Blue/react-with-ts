import React, {Component} from 'react'
import { connect } from 'react-redux'
import {ColorInfoType} from "../../type";

interface IColorInfoStore {
  colorStore: ColorInfoType
}

interface IColorInfoProps {
  colorInfo: ColorInfoType
}

interface IColorInfoState {

}

const mapStateToProps = (state: IColorInfoStore) => {
  return {
    colorInfo: state.colorStore
  }
}

class ColorInfo extends Component<IColorInfoProps, IColorInfoState>{
  render() {
    return <h1 style={{flex: 1}}>{this.props.colorInfo.name}</h1>;
  }
}

export default connect(mapStateToProps)(ColorInfo)
