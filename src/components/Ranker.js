import React, { useState, useEffect } from 'react'
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
    const { name, value } = event.currentTarget
    const index = name.slice(name.length - 1)
    const working = [...data]
    working[index] = { ...working[index], value }
    setData(working)
  }

  const [added, setAdded] = useState(false)
  function onDelete(event) {
    const {
      parentElement: rankable,
      previousSibling: input,
    } = event.currentTarget
    rankable.classList.add('invisible')

    setTimeout(() => {
      const { name } = input
      const index = name.slice(name.length - 1)
      const working = [...data]
      working.splice(index, 1)
      setData(working)
      setAdded(false)
    }, 200)
  }

  function onChangeNew(event) {
    const working = [...data]
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
    const { value } = event.currentTarget
    working.push({ id, value })
    setData(working)
    setAdded(true)

    event.currentTarget.value = ''
  }

  useEffect(() => {
    if (added) {
      const inputQuery = `.rankable--${type}:not(.rankable--new):last-child > .rankable__input`
      const input = document.querySelector(inputQuery)

      if (input) {
        const { parentElement: rankable } = input
        rankable.classList.add('invisible')

        input.focus()

        setTimeout(() => rankable.classList.remove('invisible'), 0)
      }
    }
  }, [data.length, type, added])

  const inputPlaceholder = type[0].toUpperCase() + type.slice(1)

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="current">
          {({ innerRef, droppableProps, placeholder }) => (
            <div
              className={`droppable--${type}`}
              ref={innerRef}
              {...droppableProps}
            >
              {data.map(({ _id, name }, i) => (
                <Draggable draggableId={_id} key={_id} index={i}>
                  {({ innerRef, draggableProps, dragHandleProps }) => (
                    <Rankable
                      innerRef={innerRef}
                      draggableProps={draggableProps}
                      dragHandleProps={dragHandleProps}
                      type={type}
                      index={i}
                      placeholder={inputPlaceholder}
                      value={name}
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

      {data.length < 5 && (
        <Rankable
          isNew={true}
          type={type}
          placeholder={inputPlaceholder}
          onChange={onChangeNew}
        />
      )}
    </>
  )
}
