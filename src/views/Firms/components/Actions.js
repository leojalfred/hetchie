import React, { useRef, useState } from 'react'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton'
import { useClose } from 'utils/hooks'
import empty from 'utils/empty'

export default function Actions({ onSearch, selectedIDs }) {
  const dropdownRef = useRef(null)
  const [dropdown, setDropdown] = useState()
  useClose(dropdownRef, setDropdown)

  function onSaveClick() {
    if (dropdown === undefined) {
      setDropdown(undefined)
    } else setDropdown(undefined)
  }

  return (
    <>
      {!onSearch && (
        <IconButton
          className="firms__action--save firms__action"
          icon={faSave}
        />
      )}
      {!empty(selectedIDs) && (
        <IconButton
          className="firms__action--add firms__action"
          icon={faPlusCircle}
        />
      )}
      {!onSearch && (
        <>
          <IconButton
            className="firms__action--edit firms__action"
            icon={faPencilAlt}
          />
          <IconButton
            className="firms__action--delete firms__action"
            icon={faTrashAlt}
          />
        </>
      )}
    </>
  )
}
