import React, { useState, useEffect } from 'react'
import axios from 'axios'
import isEmpty from 'is-empty'
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import rank from '../../utils/firms'
import { putLists } from '../../actions/user'
import Select from '../../components/Select'
import IconButton from '../../components/IconButton'
import Table from '../../components/Table'
import './Firms.scss'

function Firms({ user, errors }) {
  const [error, setError] = useState('')
  useEffect(() => {
    if (errors) setError(errors)
  }, [errors])

  const [firms, setFirms] = useState()
  useEffect(() => {
    async function getFirms() {
      const { data } = await axios.get('/firms')
      const ranked = rank(data)
      setFirms(ranked)
      setList(ranked)
    }
    getFirms()
  }, [])

  const [listOptions, setListOptions] = useState([])
  const [lists, setLists] = useState()
  useEffect(() => {
    let formattedListOptions = [{ value: -1, label: 'Search results' }]
    if (!isEmpty(user.data.lists)) {
      const entries = Object.entries(user.data.lists)
      const mappedListOptions = []
      for (const [id, value] of entries) {
        mappedListOptions.push({ value: id, label: value.name })
      }
      formattedListOptions = formattedListOptions.concat(mappedListOptions)

      setLists(new Map(entries))
    }
    setListOptions(formattedListOptions)
  }, [user.data.lists])

  const [list, setList] = useState([])
  function onChange({ value }) {
    const list = lists.get(value).firms
    setList(list)
  }

  return (
    <main className="firms container container--fixed">
      <h1 className="firms__heading">Firms List</h1>
      <div className="firms__topline">
        <div className="firms__selectors">
          <Select
            className="firms__select"
            options={listOptions}
            placeholder="Firms list"
            value={listOptions[0]}
            onChange={onChange}
          />
          <button className="firms__recent">West Coast</button>
          <button className="firms__recent">East Coast</button>
          <button className="firms__recent">Reaches</button>
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

      <Table listData={list} />
    </main>
  )
}

const mapStateToProps = ({ user, errors }) => ({ user, errors })
export default connect(mapStateToProps, { putLists })(Firms)
