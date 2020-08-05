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
      <td className="firm-row__cell firm-row__cell--rank">
        <Rank>{index + 1}</Rank>
      </td>
      <td className="firm-row__cell firm-row__cell--name">
        <strong>{firm.name}</strong>
      </td>
      <td className="firm-row__cell firm-row__cell--locations">
        <Tags className="firm-row__tag--location" data={firm.locations} />
      </td>
      <td className="firm-row__cell firm-row__cell--practices">
        <Tags className="firm-row__tag--practice" data={firm.practices} />
      </td>
      <td className="firm-row__cell firm-row__cell--gpa">e</td>
      <td className="firm-row__cell firm-row__cell--salary">f</td>
      <td className="firm-row__cell firm-row__cell--rankings">g</td>
      <td className="firm-row__cell firm-row__cell--qualifications">h</td>
      <td className="firm-row__cell firm-row__cell--date">i</td>
    </tr>
  )
}
