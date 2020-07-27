import React, { useState, useEffect } from 'react'
import isEmpty from 'is-empty'
import { connect } from 'react-redux'
import { putLists } from '../../actions/user'
import Select from '../../components/Select'
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
      <Select
        options={lists}
        placeholder="Firms list"
        value={lists[0]}
        onChange={onChange}
      />
    </main>
  )
}

const mapStateToProps = ({ user, errors }) => ({ user, errors })
export default connect(mapStateToProps, { putLists })(Firms)
