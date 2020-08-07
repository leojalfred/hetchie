import React from 'react'
import isEmpty from 'is-empty'
import moment from 'moment'
import Rank from './Rank'
import Tags from './Tags'
import './Row.scss'

export default function Row({
  innerRef,
  draggableProps,
  dragHandleProps,
  index,
  firm,
}) {
  console.log(firm)

  const gpa = []
  if (!isEmpty(firm.gpa)) {
    if (!isEmpty(firm.gpa.required))
      gpa.push(
        <p className="row__badge-line">
          <Rank className="row__badge row__badge--required">R</Rank>
          {firm.gpa.required}
        </p>
      )
    if (!isEmpty(firm.gpa.band))
      gpa.push(
        <p className="row__badge-line">
          <Rank className="row__badge row__badge--preferred">P</Rank>
          {firm.gpa.band}
        </p>
      )
  }

  const salary = []
  if (!isEmpty(firm.salary)) {
    if (!isEmpty(firm.salary.small))
      salary.push(
        <p className="row__badge-line">
          <Rank className="row__badge row__badge--small">S</Rank>$
          {firm.salary.small}
        </p>
      )
    if (!isEmpty(firm.salary.large))
      salary.push(
        <p className="row__badge-line">
          <Rank className="row__badge row__badge--large">L</Rank>$
          {firm.salary.large}
        </p>
      )
  }

  const rankings = firm.rankings.map(({ ranking, position }) => (
    <p className="row__badge-line">
      <a
        className="row__link"
        href={ranking.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Rank className="row__badge row__badge--rank">{position}</Rank>
        {ranking.name}
      </a>
    </p>
  ))

  const dateElement = []
  if (!isEmpty(firm.date)) {
    const date = moment(firm.date).format('MMMM Do')
    dateElement.push(date)
  }

  return (
    <tr className="row" ref={innerRef} {...draggableProps} {...dragHandleProps}>
      <td className="row__cell row__cell--rank">
        <Rank>{index + 1}</Rank>
      </td>
      <td className="row__cell row__cell--name">
        <a
          className="row__link"
          href={firm.links.firm}
          target="_blank"
          rel="noopener noreferrer"
        >
          {firm.name}
        </a>
      </td>
      <td className="row__cell row__cell--locations">
        <Tags className="row__tags--location" data={firm.locations} />
      </td>
      <td className="row__cell row__cell--practices">
        <Tags className="row__tags--practice" data={firm.practices} />
      </td>
      <td className="row__cell row__cell--gpa">{gpa}</td>
      <td className="row__cell row__cell--salary">{salary}</td>
      <td className="row__cell row__cell--rankings">{rankings}</td>
      <td className="row__cell row__cell--qualifications">
        <Tags className="row__tags--qualification" data={firm.qualifications} />
      </td>
      <td className="row__cell row__cell--date">{dateElement}</td>
    </tr>
  )
}
