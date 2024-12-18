import memoizeOne from 'memoize-one'
import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { multiReorder, multiSelect } from '../../../utils/dnd'
import Row from './Row'
import './Table.scss'

export default function Table({
  firms,
  listedFirms,
  setListedFirms,
  selectedIDs,
  setSelectedIDs,
  onSearch,
}) {
  const unselect = useCallback(() => setSelectedIDs([]), [setSelectedIDs])
  useEffect(() => {
    function onUnselect({ defaultPrevented }) {
      if (defaultPrevented) return
      unselect()
    }

    function onEscape({ defaultPrevented, key }) {
      if (defaultPrevented) return
      if (key === 'Escape') unselect()
    }

    window.addEventListener('click', onUnselect)
    window.addEventListener('keydown', onEscape)
    window.addEventListener('touchend', onUnselect)

    return () => {
      window.removeEventListener('click', onUnselect)
      window.removeEventListener('keydown', onEscape)
      window.removeEventListener('touchend', onUnselect)
    }
  }, [unselect])

  const [draggingID, setDraggingID] = useState()
  function onDragStart({ draggableId }) {
    const selected = selectedIDs.find(id => id === draggableId)
    if (!selected) unselect()

    setDraggingID(draggableId)
  }

  function onDragEnd({ destination, reason, source }) {
    setDraggingID(null)

    if (
      !destination ||
      reason === 'CANCEL' ||
      destination.index === source.index
    )
      return

    const ordered = multiReorder(listedFirms, selectedIDs, source, destination)
    setListedFirms(ordered)
  }

  const getSelectedMap = memoizeOne(ids =>
    ids.reduce((previous, current) => {
      previous[current] = true
      return previous
    }, {})
  )

  function toggleSelection(id) {
    const selected = selectedIDs.includes(id)

    let newID = []
    if (!selected) newID.push(id)

    setSelectedIDs(newID)
  }

  function toggleSelectionInGroup(id) {
    const index = selectedIDs.indexOf(id)
    if (index === -1) {
      setSelectedIDs([...selectedIDs, id])
      return
    }

    const shallow = [...selectedIDs]
    shallow.splice(index, 1)
    setSelectedIDs(shallow)
  }

  function multiSelectTo(id) {
    const selected = multiSelect(listedFirms, selectedIDs, id)
    if (selected === null) return

    setSelectedIDs(selected)
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
                {listedFirms.map((firm, i) => (
                  <Draggable
                    draggableId={firm}
                    key={firm}
                    index={i}
                    isDragDisabled={onSearch}
                  >
                    {(provided, snapshot) => {
                      const selected = getSelectedMap(selectedIDs)[firm]
                      const ghosting =
                        selected && draggingID && draggingID !== firm

                      return (
                        <Row
                          snapshot={snapshot}
                          selected={selected}
                          ghosting={ghosting}
                          firm={firms[firm]}
                          toggleSelection={toggleSelection}
                          toggleSelectionInGroup={toggleSelectionInGroup}
                          multiSelect={multiSelectTo}
                          provided={provided}
                          index={i}
                          selectionCount={selectedIDs.length}
                        />
                      )
                    }}
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
