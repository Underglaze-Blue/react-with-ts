import React, {Component} from 'react'
import GGEditor, { Flow } from 'gg-editor'
interface ITrelloProps {

}

interface ITrelloState {

}
const data = {
  nodes: [
    {
      id: '0',
      label: 'Node',
      x: 55,
      y: 55
    },
    {
      id: '1',
      label: 'Node',
      x: 55,
      y: 255
    }
  ],
  edges: [
    {
      label: 'Label',
      source: '0',
      target: '1'
    }
  ]
}
class Trello extends Component<ITrelloProps, ITrelloState>{
  render() {
    return <GGEditor>
      <Flow style={{ width: 500, height: 500 }} data={data} />
    </GGEditor>
  }
}

export default Trello
