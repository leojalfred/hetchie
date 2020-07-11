import React, { useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function Ranker() {
  const [data, setData] = useState([
    { id: '1', text: 'Minneapolis' },
    { id: '2', text: 'Asheville' },
  ])

  const onDragEnd = useCallback(() => {}, [])

  return (
    <DragDropContext className="ranker" onDragEnd={onDragEnd}>
      <Droppable droppableId="1">
        {({ innerRef, droppableProps, placeholder }) => (
          <div ref={innerRef}>
            {data.map(({ id, text }, i) => (
              <Draggable draggableId={id} key={id} index={i}>
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    {text}
                  </div>
                )}
              </Draggable>
            ))}

            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
