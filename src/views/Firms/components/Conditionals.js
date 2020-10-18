import React, { useState, useEffect } from 'react'
import { object } from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import empty from 'utils/empty'
import { putList, put } from 'actions/user'
import { idSchema, nameSchema } from 'validation/shared'
import Select from 'components/Select'
import './Conditionals.scss'

function Conditionals({
  condition,
  setMessage,
  options,
  selectedIDs,
  user,
  putList,
  put,
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
            name: nameSchema('List name'),
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

          <div className="conditionals__select-line">
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
    default:
      return null
  }
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps, { putList, put })(Conditionals)
