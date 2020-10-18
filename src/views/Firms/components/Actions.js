import React, { useRef, useState, useEffect } from 'react'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faMinus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { useClose } from 'utils/hooks'
import arraysEqual from 'utils/arraysEqual'
import { put } from 'actions/user'
import IconButton from './IconButton'
import Dropdown from 'components/Dropdown'
import Conditionals from './Conditionals'
import './Actions.scss'

function Actions({
  onSearch,
  getListFirms,
  selectedListID,
  listedFirms,
  setListedFirms,
  selectedIDs,
  setSelectedIDs,
  setMessage,
  options,
  user,
  put,
}) {
  const [dropdownActive, setDropdownActive] = useState(false)
  const [condition, setCondition] = useState()

  const dropdownRef = useRef(null)
  const activeClass = 'actions__action--active'
  useClose(dropdownRef, activeClass, setDropdownActive)

  const [showSave, setShowSave] = useState(false)
  useEffect(() => {
    if (selectedListID === -1) setShowSave(false)
    else {
      const initialListedFirms = getListFirms(selectedListID)
      const listChanged = !arraysEqual(initialListedFirms, listedFirms)

      setShowSave(listChanged)
    }
  }, [selectedListID, getListFirms, listedFirms])

  function onSaveClick(event) {
    event.preventDefault()

    try {
      const body = {
        id: user.data._id,
        list: selectedListID,
        firms: listedFirms,
      }
      put('/api/users/save-list', body)
    } catch (error) {
      setMessage(error.message)
    }
  }

  const onClick = condition => event => {
    event.preventDefault()

    const button = event.currentTarget
    button.classList.toggle(activeClass)

    if (!button.classList.contains(activeClass)) setDropdownActive(false)
    else {
      setCondition(condition)
      setDropdownActive(true)
    }
  }

  function onRemoveClick(event) {
    event.preventDefault()

    const notSelected = firm => !selectedIDs.includes(firm)
    const newListedFirms = listedFirms.filter(notSelected)
    setListedFirms(newListedFirms)
    setSelectedIDs([])
  }

  return (
    <div className="actions">
      {showSave && (
        <IconButton
          className="actions__action--save actions__action"
          icon={faSave}
          onClick={onSaveClick}
        />
      )}
      {Boolean(selectedIDs.length) && (
        <IconButton
          className="actions__action--add actions__action"
          icon={faPlus}
          onClick={onClick('add')}
        />
      )}
      {!onSearch && Boolean(selectedIDs.length) && (
        <IconButton
          className="actions__action--remove actions__action"
          icon={faMinus}
          onClick={onRemoveClick}
        />
      )}
      {!onSearch && (
        <>
          {/* <IconButton
            className="actions__action--edit actions__action"
            icon={faPencilAlt}
            onClick={onClick('edit')} */}
          />
          <IconButton
            className="actions__action--delete actions__action"
            icon={faTrashAlt}
            onClick={onClick('delete')}
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

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps, { put })(Actions)
