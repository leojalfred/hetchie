function reorderMulti(list, selectedIDs, source, destination) {
  return list
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
