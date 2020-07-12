import React, { useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import './Ranker.scss'

export default function Ranker() {
  const [data, setData] = useState([
    { id: '1', value: 'Minneapolis' },
    { id: '2', value: 'Asheville' },
  ])

  const onDragEnd = ({ destination, reason, source }) => {
    if (
      !destination ||
      reason === 'CANCEL' ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return

    const working = [...data]
    const removed = working.splice(source.index, 1)
    working.splice(destination.index, 0, removed[0])
    setData(working)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="1">
        {({ innerRef, droppableProps, placeholder }) => (
          <div ref={innerRef} {...droppableProps}>
            {data.map(({ id, value }, i) => (
              <Draggable draggableId={id} key={id} index={i}>
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <div
                    className="rankable"
                    ref={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                  >
                    <FontAwesomeIcon
                      className="rankable__handle"
                      icon={faGripVertical}
                    />
                    <span className="rankable__rank">{i + 1}</span>
                    <input
                      className="rankable__input"
                      type="text"
                      placeholder={value}
                    />
                    <FontAwesomeIcon
                      className="rankable__delete"
                      icon={faTrashAlt}
                    />
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
