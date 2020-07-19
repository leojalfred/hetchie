import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import './Rankable.scss'

export default function Rankable({
  type,
  isNew = false,
  innerRef,
  draggableProps,
  dragHandleProps,
  index,
  options,
  placeholder,
  value,
  onChange,
  onDelete,
}) {
  const classes = classNames(`rankable rankable--${type}`, {
    'rankable--new': isNew,
  })

  return (
    <div className={classes} ref={innerRef} {...draggableProps}>
      {!isNew && (
        <>
          <div {...dragHandleProps}>
            <FontAwesomeIcon
              className="rankable__handle"
              icon={faGripVertical}
            />
          </div>
          <div className="rankable__rank">{index + 1}</div>
        </>
      )}
      <Select
        className="rankable__select"
        name={`${type}-${index}`}
        options={options}
        isSearchable={true}
        placeholder={placeholder}
        defaultInputValue={value}
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
