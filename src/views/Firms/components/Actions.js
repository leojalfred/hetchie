import React, { useRef, useState } from 'react'
import { object } from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { idSchema, nameSchema } from 'validation/shared'
import { useClose } from 'utils/hooks'
import Dropdown from 'components/Dropdown'
import Select from 'components/Select'
import IconButton from './IconButton'
import empty from 'utils/empty'
import { put } from 'actions/user'
import './Actions.scss'

function Actions({ user, put, setMessage, options, onSearch, selectedIDs }) {
  const dropdownRef = useRef(null)
  const [dropdown, setDropdown] = useState()
  const active = 'actions__action--active'
  useClose(dropdownRef, active, setDropdown)

  function onCreateOption(name) {
    try {
      const schema = object().shape({
        _id: idSchema('User'),
        name: nameSchema('List name'),
      })
      const body = { _id: user.data._id, name }
      schema.validateSync(body)

      put('/api/users/list', body)
    } catch (error) {
      console.log(error)
      setMessage(error)
    }
  }

  function onAddSubmit(event) {}

  function onAddClick(event) {
    const button = event.currentTarget
    button.classList.toggle(active)

    if (!button.classList.contains(active)) setDropdown(undefined)
    else {
      setDropdown(
        <Dropdown className="actions__dropdown" innerRef={dropdownRef}>
          <h3 className="actions__heading">Add to lists</h3>

          <div className="actions__select-line">
            <Select
              creatable
              isMulti
              className="actions__select"
              options={options}
              placeholder="Firms list"
              onCreateOption={onCreateOption}
            />

            <button className="actions__submit" onClick={onAddSubmit}>
              <FontAwesomeIcon
                className="actions__submit-icon actions__submit-icon--add"
                icon={faPlus}
              />
            </button>
          </div>
        </Dropdown>
      )
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

      {dropdown}
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps, { put })(Actions)
