import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import './Rankable.scss'

export default function Rankable({
  innerRef,
  draggableProps,
  dragHandleProps,
  type,
  index,
  placeholder,
  value,
  onChange,
  onDelete,
}) {
  return (
    <div className="rankable" ref={innerRef} {...draggableProps}>
      <div {...dragHandleProps}>
        <FontAwesomeIcon icon={faGripVertical} />
      </div>
      <div className="rankable__rank">{index + 1}</div>
      <input
        className="modal__input rankable__input"
        type="text"
        name={`${type}-${index}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <FontAwesomeIcon
        className="rankable__delete"
        icon={faTrashAlt}
        onClick={onDelete}
      />
    </div>
  )
}
