import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import './Rankable.scss'

export default function Rankable({
  innerRef,
  draggableProps,
  isNew = false,
  dragHandleProps,
  type,
  index,
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
      <input
        className="modal__input rankable__input"
        type="text"
        name={`${type}-${index}`}
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
