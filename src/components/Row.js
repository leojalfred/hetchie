import React from 'react'
import classNames from 'classnames'
import isEmpty from 'is-empty'
import moment from 'moment'
import Rank from './Rank'
import Tags from './Tags'
import './Row.scss'

export default function Row({
  firm,
  toggleSelection,
  toggleSelectionInGroup,
  multiSelect,
  selected,
  provided,
  index,
  snapshot,
  selectionCount,
}) {
  function usedGroup({ ctrlKey, metaKey }) {
    const windows = navigator.platform.indexOf('Win') >= 0
    return windows ? ctrlKey : metaKey
  }

  const usedMulti = ({ shiftKey }) => shiftKey

  function execute(event) {
    if (usedGroup(event)) toggleSelectionInGroup(firm['_id'])
    else if (usedMulti(event)) multiSelect(firm['_id'])
    else toggleSelection(firm['_id'])
  }

  const keyCodes = {
    enter: 13,
    escape: 27,
    arrowDown: 40,
    arrowUp: 38,
    tab: 9,
  }
  function onKeyDown(event, provided, { isDragging }) {
    if (
      event.defaultPrevented ||
      isDragging ||
      event.keyCode !== keyCodes.enter
    )
      return

    event.preventDefault()
    execute(event)
  }

  const primary = 0
  function onClick(event) {
    if (event.defaultPrevented || event.button !== primary) return

    event.preventDefault()
    execute(event)
  }

  function onTouchEnd(event) {
    if (event.defaultPrevented) return

    event.preventDefault()
    toggleSelectionInGroup(firm['_id'])
  }

  const classes = classNames('row', { 'row--selected': selected })
  const gpa = []
  if (!isEmpty(firm.gpa)) {
    if (!isEmpty(firm.gpa.required))
      gpa.push(
        <p className="row__badge-line" key="required">
          <Rank className="row__badge row__badge--required">R</Rank>
          {firm.gpa.required}
        </p>
      )
    if (!isEmpty(firm.gpa.band))
      gpa.push(
        <p className="row__badge-line" key="preferred">
          <Rank className="row__badge row__badge--preferred">P</Rank>
          {firm.gpa.band}
        </p>
      )
  }

  const salary = []
  if (!isEmpty(firm.salary)) {
    if (!isEmpty(firm.salary.small))
      salary.push(
        <p className="row__badge-line" key="small">
          <Rank className="row__badge row__badge--small">S</Rank>$
          {firm.salary.small}
        </p>
      )
    if (!isEmpty(firm.salary.large))
      salary.push(
        <p className="row__badge-line" key="large">
          <Rank className="row__badge row__badge--large">L</Rank>$
          {firm.salary.large}
        </p>
      )
  }

  const rankings = firm.rankings.map(({ ranking, position }, i) => (
    <p className="row__badge-line" key={i}>
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

  const showCount = snapshot.isDragging && selectionCount > 1

  return (
    <tr
      className={classes}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      onKeyDown={event => onKeyDown(event, provided, snapshot)}
    >
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

      {showCount && (
        <td className="row__count-cell">
          <Rank className="row__count">{selectionCount}</Rank>
        </td>
      )}
    </tr>
  )
}
