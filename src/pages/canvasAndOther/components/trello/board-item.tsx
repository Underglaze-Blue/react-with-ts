import React, {Component} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

interface IBoardItemProps {
  index: number
  item: any
}

interface IBoardItemState {

}

interface BoardItemStylesProps {
  isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 8px;
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  border-radius: 4px;
  transition: background-color .25s ease-out;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 60px;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 5px;
  }
`

// Create and export the BoardItem component
class BoardItem extends Component<IBoardItemProps, IBoardItemState>{
  render() {
    return <Draggable draggableId={this.props.item.id} index={this.props.index}>
      {(provided, snapshot) => (
        <BoardItemEl
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {/* The content of the BoardItem */}
          {this.props.item.content}
        </BoardItemEl>
      )}
    </Draggable>
  }
}

export default BoardItem

