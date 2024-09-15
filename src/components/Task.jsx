import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

function Task(props){

    const Container = styled.div`
        border: 1px solid #000000;
        border-radius: 0.25rem;
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: ${props => props.isDragDisabled ? 'grey' : props.isDragging ? 'lightgreen' : 'white'};
    `;

    const isDragDisabled = props.task.id === 'task-1'; // disable dragging for task-1

    return(
        <Draggable 
            draggableId={props.task.id} 
            index={props.index}
            isDragDisabled={isDragDisabled} // disable dragging item by condition
            >
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}  // Định nghĩa thành phần có thể dùng chuột kéo thả. => Trong trường hợp này ta có thể cầm kéo thả trên cả Container
                    isDragging={snapshot.isDragging} // truyền isDragging xuống Container để xử lý style
                    isDragDisabled={isDragDisabled} // truyền isDragDisabled xuống Container để xử lý style
                >
                    {props.task.content}
                </Container>
            )}
        </Draggable>
    )
}

export default Task;