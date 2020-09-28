import React, { useRef, useState } from 'react'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton'
import { useClose } from 'utils/hooks'
import Dropdown from 'components/Dropdown'
import Select from 'components/Select'
import empty from 'utils/empty'
import './Actions.scss'

export default function Actions({ options, onSearch, selectedIDs }) {
  const dropdownRef = useRef(null)
  const [dropdown, setDropdown] = useState()
  useClose(dropdownRef, setDropdown)

  function onChange(e) {
    console.log(e)
  }

  function onAddClick(event) {
    const button = event.currentTarget
    const active = 'actions__action--active'
    if (button.classList.contains(active)) {
      setDropdown(undefined)
    } else {
      setDropdown(
        <Dropdown className="actions__dropdown" innerRef={dropdownRef}>
          <h3 className="actions__heading">Create list</h3>

          <Select
            creatable
            className="actions__select"
            options={options}
            placeholder="Firms list"
            value={options[0]}
            onChange={onChange}
          />
        </Dropdown>
      )
    }

    button.classList.toggle(active)
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
