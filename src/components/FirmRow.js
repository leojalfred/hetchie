import React from 'react'
import classNames from 'classnames'
import isEmpty from 'is-empty'
import Rank from './Rank'
import './FirmRow.scss'

export default function FirmRow({
  isDragging,
  innerRef,
  draggableProps,
  dragHandleProps,
  index,
  firm,
}) {
  const classes = classNames('firm-row', { 'firm-row--dragging': isDragging })

  return (
    <tr
      className={classes}
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
    >
      <td>
        <Rank>{index + 1}</Rank>
      </td>
      <td>b</td>
      <td>c</td>
      <td>d</td>
      <td>e</td>
      <td>f</td>
      <td>g</td>
      <td>h</td>
      <td>i</td>
    </tr>
  )
}
