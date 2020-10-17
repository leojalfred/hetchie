import React, { useRef, useState } from 'react'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { useClose } from 'utils/hooks'
import Dropdown from 'components/Dropdown'
import IconButton from './IconButton'
import empty from 'utils/empty'
import Conditionals from './Conditionals'
import './Actions.scss'

export default function Actions({
  setMessage,
  options,
  setOptions,
  onSearch,
  selectedIDs,
}) {
  const [dropdownActive, setDropdownActive] = useState(false)
  const [condition, setCondition] = useState()

  const dropdownRef = useRef(null)
  const activeClass = 'actions__action--active'
  useClose(dropdownRef, activeClass, setDropdownActive)

  function onAddClick(event) {
    event.preventDefault()

    const button = event.currentTarget
    button.classList.toggle(activeClass)

    if (!button.classList.contains(activeClass)) setDropdownActive(false)
    else {
      setCondition('add')
      setDropdownActive(true)
    }
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
          icon={faPlus}
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

      {dropdownActive && (
        <Dropdown
          className="actions__dropdown"
          innerRef={dropdownRef}
          onClick={event => event.preventDefault()}
        >
          <Conditionals
            condition={condition}
            setMessage={setMessage}
            options={options}
            selectedIDs={selectedIDs}
          />
        </Dropdown>
      )}
    </div>
  )
}
