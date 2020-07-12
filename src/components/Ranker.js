import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { Field } from 'formik'
import './Ranker.scss'

export default function Ranker({ type }) {
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
                  <div className="rankable" ref={innerRef} {...draggableProps}>
                    <div {...dragHandleProps}>
                      <FontAwesomeIcon icon={faGripVertical} />
                    </div>
                    <div className="rankable__rank">{i + 1}</div>
                    <Field
                      className="modal__input rankable__input"
                      type="text"
                      name={`${type}-${i}`}
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
