import * as interfaceType from './interface'

const defaultState: interfaceType.IStoreState={
  list: []
}
const reducer=(state= defaultState,action: any)=>{
  switch (action.type) {
    case 'list':
      return action.list
    default:
      return state.list
  }
}
export default reducer;
