import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import FirmRow from './FirmRow'

export default function FirmsTable({ listData }) {
  function reorder(list, start, end) {
    const result = Array.from(list)
    const [removed] = result.splice(start, 1)
    result.splice(end, 0, removed)

    return result
  }

  // return
  const [list, setList] = useState(listData)
  useEffect(() => setList(listData), [listData])

  function onDragEnd({ destination, source }) {
    if (!destination || destination.index === source.index) return

    const ordered = reorder(list, source.index, destination.index)
    setList(ordered)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Firm</th>
            <th>Location</th>
            <th>Practice</th>
            <th>GPA</th>
            <th>Salary</th>
            <th>Rankings</th>
            <th>Qualifications</th>
            <th>Date</th>
          </tr>
        </thead>
        <Droppable droppableId="firms">
          {({ innerRef, droppableProps, placeholder }) => (
            <tbody ref={innerRef} {...droppableProps}>
              {list.map((firm, i) => (
                <Draggable
                  draggableId={`firm-${i}`}
                  key={`firm-${i}`}
                  index={i}
                >
                  {(
                    { innerRef, draggableProps, dragHandleProps },
                    { isDragging }
                  ) => (
                    <FirmRow
                      isDragging={isDragging}
                      innerRef={innerRef}
                      draggableProps={draggableProps}
                      dragHandleProps={dragHandleProps}
                      index={i}
                      firm={firm}
                    />
                  )}
                </Draggable>
              ))}

              {placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  )
}
