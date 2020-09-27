import React from 'react'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton'
import empty from 'utils/empty'

export default function Actions({ onSearch, selectedIDs }) {
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
