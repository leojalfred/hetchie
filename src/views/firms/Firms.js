import React, { useState, useEffect } from 'react'
import isEmpty from 'is-empty'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { putLists } from '../../actions/user'
import Select from '../../components/Select'
import IconButton from '../../components/IconButton'
import FirmsTable from '../../components/FirmsTable'
import './Firms.scss'

function Firms({ user, errors }) {
  const [lists, setLists] = useState([])
  useEffect(() => {
    let formattedLists = [{ value: -1, label: 'Search results' }]
    if (!isEmpty(user.data.lists)) {
      const mappedLists = user.data.lists.map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      formattedLists = formattedLists.concat(mappedLists)
    }

    setLists(formattedLists)
  }, [user.data.lists])

  const [activeList, setActiveList] = useState(-1)
  const onChange = value => setActiveList(value)

  return (
    <main className="firms container">
      <h1 className="firms__heading">Firms List</h1>
      <div className="firms__topline">
        <div className="firms__selectors">
          <Select
            className="firms__select"
            options={lists}
            placeholder="Firms list"
            value={lists[0]}
            onChange={onChange}
          />
        </div>
        <div className="firms__actions">
          <IconButton
            className="firms__action--save firms__action"
            icon={faSave}
          />
          <IconButton
            className="firms__action--add firms__action"
            icon={faPlusCircle}
          />
          <IconButton
            className="firms__action--edit firms__action"
            icon={faPencilAlt}
          />
          <IconButton
            className="firms__action--delete firms__action"
            icon={faTrashAlt}
          />
        </div>
      </div>
      <FirmsTable />
    </main>
  )
}

const mapStateToProps = ({ user, errors }) => ({ user, errors })
export default connect(mapStateToProps, { putLists })(Firms)
