import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { multiReorder } from '../utils/dnd'
import Row from './Row'
import './Table.scss'

export default function Table({ listData, firms }) {
  const [list, setList] = useState(listData)
  useEffect(() => setList(listData), [listData])

  const [selectedIDs, setSelectedIDs] = useState([])
  const [draggingID, setDraggingID] = useState()

  const unselect = () => setSelectedIDs([])
  function onDragStart({ draggableId }) {
    const selected = selectedIDs.find(id => id === draggableId)
    if (!selected) unselect()

    setDraggingID(draggableId)
  }

  function onDragEnd({ destination, reason, source }) {
    if (
      !destination ||
      reason === 'CANCEL' ||
      destination.index === source.index
    ) {
      setDraggingID(null)
      return
    }

    const ordered = multiReorder(list, selectedIDs, source, destination)
    setList(ordered)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="table__wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="table__heading">Rank</th>
              <th className="table__heading">Firm</th>
              <th className="table__heading">Location</th>
              <th className="table__heading">Practice</th>
              <th className="table__heading">GPA</th>
              <th className="table__heading">Salary</th>
              <th className="table__heading">Rankings</th>
              <th className="table__heading">Qualifications</th>
              <th className="table__heading">Date</th>
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
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                      <Row
                        innerRef={innerRef}
                        draggableProps={draggableProps}
                        dragHandleProps={dragHandleProps}
                        index={i}
                        firm={firms[firm]}
                      />
                    )}
                  </Draggable>
                ))}

                {placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </div>
    </DragDropContext>
  )
}
