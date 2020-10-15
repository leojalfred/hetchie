import React from 'react'
import { object } from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { put } from 'actions/user'
import { idSchema, nameSchema } from 'validation/shared'
import Select from 'components/Select'

function Conditionals({
  condition,
  setMessage,
  activeClass,
  options,
  user,
  put,
}) {
  switch (condition) {
    case 'add':
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
          setMessage(error)
        }
      }

      function onAddSubmit(event) {}

      return (
        <>
          <h3 className="actions__heading">Add to lists</h3>

          <div className="actions__select-line">
            <Select
              creatable
              isMulti
              className="actions__select"
              options={options.slice(1)}
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
        </>
      )
    default:
      return null
  }
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps, { put })(Conditionals)
