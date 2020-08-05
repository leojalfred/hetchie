import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function FirmsTable({ data }) {
  function reorder(list, start, end) {
    const result = Array.from(list)
    const [removed] = result.splice(start, 1)
    result.splice(end, 0, removed)

    return result
  }

  const [list, setList] = useState(data)
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
      </table>
      <Droppable droppableId="firms">
        {({ innerRef, droppableProps, placeholder }) => (
          <tbody ref={innerRef} {...droppableProps}>
            {list.map(({ row, i }) => (
              <Draggable draggableId={i} key={i} index={i}>
                {(provided, snapshot) => <tr></tr>}
              </Draggable>
            ))}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  )
}
