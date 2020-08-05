import React from 'react'
import classNames from 'classnames'
import isEmpty from 'is-empty'
import Rank from './Rank'
import './FirmRow.scss'

export default function FirmRow({
  innerRef,
  draggableProps,
  dragHandleProps,
  index,
  firm,
}) {
  console.log(firm)

  return (
    <tr
      className="firm-row"
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
    >
      <td>
        <Rank>{index + 1}</Rank>
      </td>
      <td>{firm.name}</td>
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
