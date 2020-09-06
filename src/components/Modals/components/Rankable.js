import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Badge from 'components/Badge/Badge'
import Select from 'components/Select/Select'
import './Rankable.scss'

export default function Rankable({
  type,
  isNew = false,
  innerRef,
  draggableProps,
  dragHandleProps,
  index,
  options,
  data,
  placeholder,
  value,
  onChange,
  onDelete,
}) {
  const classes = classNames(`rankable rankable--${type}`, {
    'rankable--new': isNew,
  })
  const isOptionDisabled = option =>
    data.some(element => element.value === option.value)

  return (
    <div
      id={`${type}-${index}`}
      className={classes}
      ref={innerRef}
      {...draggableProps}
    >
      {!isNew && (
        <>
          <div {...dragHandleProps}>
            <FontAwesomeIcon
              className="rankable__handle"
              icon={faGripVertical}
            />
          </div>
          <Badge className="rankable__rank">{index + 1}</Badge>
        </>
      )}
      <Select
        name={`${type}-${index}`}
        options={options}
        isOptionDisabled={isOptionDisabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {!isNew && (
        <FontAwesomeIcon
          className="rankable__delete"
          icon={faTrashAlt}
          onClick={onDelete}
        />
      )}
    </div>
  )
}
