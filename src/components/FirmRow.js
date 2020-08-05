import React from 'react'
import classNames from 'classnames'
import isEmpty from 'is-empty'
import Rank from './Rank'
import Tags from './Tags'
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
      <td>
        <strong>{firm.name}</strong>
      </td>
      <td>
        <Tags className="firm-row__tag--location" data={firm.locations} />
      </td>
      <td>
        <Tags className="firm-row__tag--practice" data={firm.practices} />
      </td>
      <td>e</td>
      <td>f</td>
      <td>g</td>
      <td>h</td>
      <td>i</td>
    </tr>
  )
}
