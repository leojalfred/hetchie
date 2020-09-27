import React, { useRef, useState } from 'react'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton'
import { useClose } from 'utils/hooks'
import Dropdown from 'components/Dropdown'
import empty from 'utils/empty'
import './Actions.scss'

export default function Actions({ onSearch, selectedIDs }) {
  const dropdownRef = useRef(null)
  const [dropdown, setDropdown] = useState()
  useClose(dropdownRef, setDropdown)

  function onAddClick() {
    setDropdown(
      <Dropdown className="actions__dropdown" innerRef={dropdownRef}>
        <h3 className="actions__heading">Create list</h3>
      </Dropdown>
    )
  }

  return (
    <div className="actions">
      {!onSearch && (
        <IconButton
          className="actions__action--save actions__action"
          icon={faSave}
        />
      )}
      {!empty(selectedIDs) && (
        <IconButton
          className="actions__action--add actions__action"
          onClick={onAddClick}
          icon={faPlusCircle}
        />
      )}
      {!onSearch && (
        <>
          <IconButton
            className="actions__action--edit actions__action"
            icon={faPencilAlt}
          />
          <IconButton
            className="actions__action--delete actions__action"
            icon={faTrashAlt}
          />
        </>
      )}

      {dropdown}
    </div>
  )
}
