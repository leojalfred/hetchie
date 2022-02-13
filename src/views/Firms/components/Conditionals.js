import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { object, string } from 'yup'
import { deleteAction, put, putList } from '../../../actions/user'
import Select from '../../../components/Select'
import empty from '../../../utils/empty'
import { idSchema } from '../../../validation/shared'
import './Conditionals.scss'

function Conditionals({
  condition,
  setDropdownActive,
  setMessage,
  selectedIDs,
  selectedListID,
  switchList,
  options,
  user,
  putList,
  put,
  deleteAction,
}) {
  const [selectedLists, setSelectedLists] = useState([])
  const [putListOption, setPutListOption] = useState()
  useEffect(() => {
    if (!empty(putListOption)) {
      setSelectedLists([...selectedLists, putListOption])
      setPutListOption()
    }
  }, [selectedLists, putListOption])

  switch (condition) {
    case 'add':
      const onChange = lists => setSelectedLists(lists)

      function onCreateOption(name) {
        try {
          const schema = object().shape({
            _id: idSchema('User'),
            name: string().required('List name is required.'),
          })
          const body = { _id: user.data._id, name }
          schema.validateSync(body)

          putList(body, setPutListOption)
        } catch (error) {
          setMessage(error.message)
        }
      }

      function onAddSubmit(event) {
        try {
          const lists = selectedLists.map(list => list.value)
          const body = { id: user.data._id, lists, firms: selectedIDs }
          put('/api/users/lists', body)

          setSelectedLists([])
        } catch (error) {
          setMessage(error.message)
        }
      }

      return (
        <>
          <h3 className="conditionals__heading">Add to lists</h3>

          <div className="conditionals__line">
            <Select
              creatable
              isMulti
              options={options.slice(1)}
              placeholder="Firms list"
              value={selectedLists}
              onChange={onChange}
              onCreateOption={onCreateOption}
            />

            <button className="conditionals__submit" onClick={onAddSubmit}>
              <FontAwesomeIcon
                className="conditionals__submit-icon conditionals__submit-icon--add"
                icon={faPlus}
              />
            </button>
          </div>
        </>
      )
    case 'delete':
      function onDeleteSubmit(event) {
        try {
          const body = { id: user.data._id, list: selectedListID }
          deleteAction('/api/users/list', body)

          switchList({ value: -1, label: 'Search results' })
          setDropdownActive()
        } catch (error) {
          setMessage(error.message)
        }
      }

      return (
        <div className="conditionals__line">
          <h3 className="conditionals__line-heading">Delete this list?</h3>

          <button className="conditionals__submit" onClick={onDeleteSubmit}>
            <FontAwesomeIcon
              className="conditionals__submit-icon conditionals__submit-icon--remove"
              icon={faTrashAlt}
            />
          </button>
        </div>
      )
    default:
      return null
  }
}

const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = { putList, put, deleteAction }
export default connect(mapStateToProps, mapDispatchToProps)(Conditionals)
