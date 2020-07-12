import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Rankable from './Rankable'

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
                  <Rankable
                    innerRef={innerRef}
                    draggableProps={draggableProps}
                    dragHandleProps={dragHandleProps}
                    type={type}
                    index={i}
                    placeholder={inputPlaceholder}
                    value={value}
                    onChange={onChange}
                    onDelete={onDelete}
                  />
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
