function reorderMulti(list, selectedIDs, source, destination) {
  const dragged = list[source.index]
  const offset = selectedIDs.reduce((previous, current) => {
    if (current === dragged || list.indexOf(current) >= destination.index)
      return previous
    return previous + 1
  }, 0)
  const indexInsert = destination.index - offset

  const ordered = [...selectedIDs]
  ordered.sort((a, b) => {
    const indexA = list.indexOf(a)
    const indexB = list.indexOf(b)
    if (indexA !== indexB) return indexA - indexB

    return -1
  })

  const result = list.filter(id => !selectedIDs.includes(id))
  result.splice(indexInsert, 0, ...ordered)

  return result
}

function reorder(list, start, end) {
  const result = [...list]
  const [removed] = result.splice(start, 1)
  result.splice(end, 0, removed)

  return result
}

export function multiReorder(list, selectedIDs, source, destination) {
  if (selectedIDs.length > 1)
    return reorderMulti(list, selectedIDs, source, destination)

  return reorder(list, source.index, destination.index)
}

export function multiSelect(list, selectedIDs, newID) {
  if (!selectedIDs.length) return [newID]

  const newIndex = list.indexOf(newID)
  const lastSelected = selectedIDs[selectedIDs.length - 1]
  const lastIndex = list.indexOf(lastSelected)
  if (newIndex === lastIndex) return null

  const forwards = newIndex > lastIndex
  const start = forwards ? lastIndex : newIndex
  const end = forwards ? newIndex : lastIndex

  const between = list.slice(start, end + 1)
  const toAdd = between.filter(id => !selectedIDs.includes(id))

  const sorted = forwards ? toAdd : [...toAdd].reverse()
  const combined = [...selectedIDs, ...sorted]
  return combined
}
