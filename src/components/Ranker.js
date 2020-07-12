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
  const [removed, setRemoved] = useState(false)
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
      setRemoved(true)
    }, 200)
  }

  function onChangeNew(event) {
    const working = [...data]
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString()
    const { value } = event.currentTarget
    working.push({ id, value })
    setData(working)
    setAdded(true)
    setRemoved(false)

    event.currentTarget.value = ''
  }

  useEffect(() => {
    const inputQuery = `.rankable--${type}:not(.rankable--new):last-child > .rankable__input`
    const input = document.querySelector(inputQuery)

    if (input && added) {
      const { parentElement: rankable } = input
      rankable.classList.add('invisible')

      input.focus()

      setTimeout(() => rankable.classList.remove('invisible'), 0)
    } else if (data.length === 4 && removed) {
      const rankableQuery = `.rankable--${type}.rankable--new`
      const rankable = document.querySelector(rankableQuery)
      rankable.classList.add('invisible')
      setTimeout(() => rankable.classList.remove('invisible'), 0)
    }
  }, [data.length, type, added, removed])

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

      {data.length < 5 && (
        <div className={`rankable rankable--${type} rankable--new`}>
          <input
            className="modal__input rankable__input"
            type="text"
            name={`${type}-new`}
            placeholder={inputPlaceholder}
            onChange={onChangeNew}
          />
        </div>
      )}
    </>
  )
}
