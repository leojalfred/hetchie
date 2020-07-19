import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Rankable from './Rankable'

export default function Ranker({ type, userData, setUserData, options }) {
  function onDragEnd({ destination, reason, source }) {
    if (
      !destination ||
      reason === 'CANCEL' ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return

    const working = [...userData]
    const removed = working.splice(source.index, 1)
    working.splice(destination.index, 0, removed[0])
    setUserData(working)
  }

  function onChange(i, value, label) {
    const working = [...userData]
    working[i] = { value, label }
    setUserData(working)
  }

  const [added, setAdded] = useState(false)
  function onDelete(selector, i) {
    const rankable = document.querySelector(selector)
    rankable.classList.add('invisible')

    setTimeout(() => {
      const working = [...userData]
      working.splice(i, 1)
      setUserData(working)
      setAdded(false)
    }, 200)
  }

  function onNewInputChange({ value, label }) {
    const working = [...userData]
    working.push({ value, label })

    setUserData(working)
    setAdded(true)
  }

  const [newValue, setNewValue] = useState()
  useEffect(() => {
    if (added) {
      const rankableQuery = `.rankable--${type}:not(.rankable--new):last-child`
      const rankable = document.querySelector(rankableQuery)
      rankable.classList.add('static')
      rankable.style.opacity = 0

      const input = rankable.querySelector('input')
      input.focus()

      setNewValue(null)
      setTimeout(() => {
        rankable.classList.remove('static')
        rankable.style.opacity = 1
      }, 0)
    }
  }, [userData, added, type])

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
              {userData.map(({ value, label }, i) => (
                <Draggable draggableId={value} key={`${type}-${i}`} index={i}>
                  {({ innerRef, draggableProps, dragHandleProps }) => (
                    <Rankable
                      innerRef={innerRef}
                      draggableProps={draggableProps}
                      dragHandleProps={dragHandleProps}
                      type={type}
                      index={i}
                      options={options}
                      placeholder={inputPlaceholder}
                      value={{ value, label }}
                      onChange={({ value, label }) => onChange(i, value, label)}
                      onDelete={() => onDelete(`#${type}-${i}`, i)}
                    />
                  )}
                </Draggable>
              ))}

              {placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {userData.length < 5 && (
        <Rankable
          isNew={true}
          type={type}
          index="5"
          options={options}
          placeholder={inputPlaceholder}
          value={newValue}
          onChange={onNewInputChange}
        />
      )}
    </>
  )
}
