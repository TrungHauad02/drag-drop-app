// onDragStart
const start = {
    draggaleId: 'task-1',
    type: 'TYPE',
    source: {
        droppableId: 'column-1',
        index: 0
    },
}

// onDragUpdate
const update = {
    ...start,
    destination: {
        droppableId: 'column-1',
        index: 1
    }
}

// onDragEnd
const end = {
    ...update,
    destination: {
        droppableId: 'column-1',
        index: 1
    }
}

// snapshot
const draggableSnapshot = {
    isDragging: true,
    draggingOver: 'column-1'
}

const droppableSnapshot = {
    isDraggingOver: true,
    draggingOverWith: 'task-1'
}

// result
const result = {
    draggableId: 'task-1',
    type: 'TYPE',
    source: {
        droppableId: 'column-1',
        index: 0
    },
    destination: {
        droppableId: 'column-1',
        index: 1
    }
}