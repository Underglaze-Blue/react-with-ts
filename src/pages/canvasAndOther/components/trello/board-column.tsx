import React, {Component} from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

// Import BoardItem component
import BoardItem from './board-item'

// Define types for board column element properties
interface IBoardColumnProps {
  key: string,
  column: any,
  items: any,
}

interface IBoardColumnState {

}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
interface BoardColumnContentStylesProps {
  isDraggingOver: boolean
}

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  margin-bottom: 12px;
`

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 40px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : null};
  border-radius: 4px;
`

// Create and export the BoardColumn component
class BoardColumn extends Component<IBoardColumnProps, IBoardColumnState>{
  render() {
    return (
      <BoardColumnWrapper>
        {/* Title of the column */}
        <BoardColumnTitle>
          {this.props.column.title}
        </BoardColumnTitle>

        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <BoardColumnContent
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {/* All board items belong into specific column. */}
              {this.props.items.map((item: any, index: number) => <BoardItem key={item.id} item={item} index={index} />)}
              {provided.placeholder}
            </BoardColumnContent>
          )}
        </Droppable>
      </BoardColumnWrapper>
    )
  }
}

export default BoardColumn
