import React from 'react'
import classNames from 'classnames'
import empty from 'utils/empty'
import formatDate from 'utils/formatDate'
import Badge from 'components/Badge'
import Tags from './Tags'
import './Row.scss'

export default function Row({
  snapshot,
  selected,
  ghosting,
  firm,
  toggleSelection,
  toggleSelectionInGroup,
  multiSelect,
  provided,
  index,
  selectionCount,
}) {
  const classes = classNames('row', {
    'row--dragging': snapshot.isDragging,
    'row--selected': selected,
    'row--ghosting': ghosting,
  })

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

  const isLink = ({ target }) => target.tagName === 'A'
  function onClick(event) {
    const primary = 0
    if (event.defaultPrevented || event.button !== primary || isLink(event))
      return

    event.preventDefault()
    execute(event)
  }

  function onTouchEnd(event) {
    if (event.defaultPrevented || isLink(event)) return

    event.preventDefault()
    toggleSelectionInGroup(firm['_id'])
  }

  const gpa = []
  if (!empty(firm.gpa)) {
    if (firm.gpa.required)
      gpa.push(
        <p className="row__badge-line" key="required">
          <Badge className="row__badge row__badge--required">R</Badge>
          {firm.gpa.required}
        </p>
      )
    if (firm.gpa.band)
      gpa.push(
        <p className="row__badge-line" key="preferred">
          <Badge className="row__badge row__badge--preferred">P</Badge>
          {firm.gpa.band}
        </p>
      )
  }

  const salary = []
  if (!empty(firm.salary)) {
    if (firm.salary.small)
      salary.push(
        <p className="row__badge-line" key="small">
          <Badge className="row__badge row__badge--small">S</Badge>$
          {firm.salary.small}
        </p>
      )
    if (firm.salary.large)
      salary.push(
        <p className="row__badge-line" key="large">
          <Badge className="row__badge row__badge--large">L</Badge>$
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
        <Badge className="row__badge row__badge--rank">{position}</Badge>
        {ranking.name}
      </a>
    </p>
  ))

  const dateElement = []
  if (firm.date) {
    const date = formatDate(firm.date)
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
        <Badge>{index + 1}</Badge>
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
          <Badge className="row__count">{selectionCount}</Badge>
        </td>
      )}
    </tr>
  )
}
