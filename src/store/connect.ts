import {IStoreState} from './interface'
import {connect} from 'react-redux'

const mapState=(state: IStoreState)=>{
  return{ list: state.list }
}

const mapDispatch=(dispatch: Function)=>{
  return  dispatch({type: 'list', list: ['1','2']})
}

export default connect(mapState,mapDispatch)
