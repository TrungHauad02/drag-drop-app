import initialData from "../data/initialData";
import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
`;

function DragDropApp(){

    const [state, setState] = useState(initialData);

    const handleOnDragStart = () => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
    }

    const handleOnDragUpdate = (update) => {
        const {destination} = update;
        const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    }

    const handleOnDragEnd = (result) => {
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';

        const {destination, source, draggableId} = result;

        // if there is no destination, return
        if(!destination) return;
        // if the destination is the same as the source, return 
        if(destination.droppableId === source.droppableId && destination.index === source.index) return;

        const start = state.columns[source.droppableId]; // get the column by source droppableId
        const finish = state.columns[destination.droppableId]; // get the column by destination droppableId

        if (start === finish){
            const newTaskIds = Array.from(start.taskIds);  // get the taskIds from the column
            newTaskIds.splice(source.index, 1); // remove the task from the source index
            newTaskIds.splice(destination.index, 0, draggableId); // add the task to the destination index
    
            // create a new column with the new taskIds
            const newColumn = {
                ...start, // copy the column
                taskIds: newTaskIds // update the taskIds
            };
    
            const newState = {
                ...state, // copy the state
                columns: { // update the columns
                    ...state.columns,
                    [newColumn.id]: newColumn
                }
            };
            setState(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds); // get the taskIds from the start column
        startTaskIds.splice(source.index, 1); // remove the task from the source index
        const newStart = {
            ...start, // copy the start column
            taskIds: startTaskIds // update the taskIds
        };

        const finishTaskIds = Array.from(finish.taskIds); // get the taskIds from the finish column
        finishTaskIds.splice(destination.index, 0, draggableId); // add the task to the destination index
        const newFinish = {
            ...finish, // copy the finish column
            taskIds: finishTaskIds // update the taskIds
        };

        const newState = {
            ...state, // copy the state
            columns: { // update the columns
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        setState(newState);
    }

    return(
        <DragDropContext 
            onDragEnd={handleOnDragEnd}
            onDragStart={handleOnDragStart}
            onDragUpdate={handleOnDragUpdate}
        >
            <Container>
            {
                state.columnOrder.map(columnId => {   //map to get ColumnId in columnOrder
                    const column = state.columns[columnId];  //map to get column by ColumnId
                    const tasks = column.taskIds.map(taskId => state.tasks[taskId]); // check field taskIds in column to get taskId then map to tasks

                    return <Column key={column.id} column={column} tasks={tasks} />
                })
            }
            </Container>
        </DragDropContext>
    )
}

export default DragDropApp;