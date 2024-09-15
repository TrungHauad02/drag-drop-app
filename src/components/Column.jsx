import styled from "styled-components";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

function Column(props) {
    const Container = styled.div`
        margin: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #000;
        max-width: 30%;
        min-width: 30%;
        display: flex;
        flex-direction: column;
    `;
    const Title = styled.h3`
        padding: 1rem;
    `;
    const TaskList = styled.div`
        padding: 1rem;
        transition: background-color 0.2s ease;
        background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
        flex-grow: 1;           // make the TaskList take up all the available space
        min-height: 100px;      // set a minimum height for the TaskList so that it doesn't collapse when there are no tasks
    `;

    const isDropDisabled = props.column.id === 'column-3'; // disable dropping for column-3

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
        {(provided) => (
            <Container
                {...provided.draggableProps}
                ref={provided.innerRef}
                >
            <Title 
                {...provided.dragHandleProps}
                >{props.column.title}</Title>
            <Droppable 
                droppableId={props.column.id}
                //type={props.column.id === 'column-3' ? 'done' : 'active'} // define the type of draggable items that can be dropped into this droppable
                type="task"
                isDropDisabled={isDropDisabled} // disable dropable by condition
                direction="vertical" // set the direction of the droppable -> DEFAULT: vertical
                >
            {
                (provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef} 
                        {...provided.droppableProps} // Định nghĩa thành phần có thể thả vào. => Trong trường hợp này ta có thể thả Task vào TaskList
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                        {provided.placeholder} {/* add a placeholder to the TaskList to indicate where a draggable item will be dropped */}
                    </TaskList>
                )
            }
            </Droppable>
        </Container>
        )}
    </Draggable>
  );
}

export default Column;