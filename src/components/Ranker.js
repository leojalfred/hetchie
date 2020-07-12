import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import './Ranker.scss'

export default function Ranker({ type, data, setData }) {
  function onDragEnd({ destination, reason, source }) {
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

  function onChange(event) {
    const name = event.target.name
    const index = name.slice(name.length - 1)
    const working = [...data]
    working[index].value = event.target.value
    setData(working)
  }

  function onDelete(event) {
    console.log(event.currentTarget.previousSibling)
    const { name } = event.currentTarget.previousSibling
    const index = name.slice(name.length - 1)
    const working = [...data]
    working.splice(index, 1)
    setData(working)
  }

  const inputPlaceholder = type[0].toUpperCase() + type.slice(1)

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
                    <input
                      className="modal__input rankable__input"
                      type="text"
                      name={`${type}-${i}`}
                      placeholder={inputPlaceholder}
                      value={value}
                      onChange={onChange}
                    />
                    <FontAwesomeIcon
                      className="rankable__delete"
                      icon={faTrashAlt}
                      onClick={onDelete}
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
