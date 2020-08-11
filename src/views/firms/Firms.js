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
import Errors from '../../components/Errors'
import Table from '../../components/Table'
import './Firms.scss'

function Firms({ user, errors }) {
  const [error, setError] = useState('')
  useEffect(() => {
    if (errors) setError(errors)
  }, [errors])

  const [firms, setFirms] = useState()
  const [list, setList] = useState([])
  useEffect(() => {
    async function getFirms() {
      const { data } = await axios.get('/firms')
      setFirms(data)

      const ranked = rank(data)
      setList(ranked)
    }
    getFirms()
  }, [])

  const [listOptions, setListOptions] = useState([
    { value: -1, label: 'Search results' },
  ])
  const [lists, setLists] = useState()
  useEffect(() => {
    let formattedListOptions = [{ value: -1, label: 'Search results' }]
    if (!isEmpty(user.data.lists)) {
      const entries = Object.entries(user.data.lists)
      const mappedListOptions = []
      for (const [id, value] of entries) {
        mappedListOptions.push({ value: id, label: value.name })
      }
      formattedListOptions = [...formattedListOptions, mappedListOptions]

      setLists(new Map(entries))
    }
    setListOptions(formattedListOptions)
  }, [user.data.lists])

  function onChange({ value }) {
    const list = lists.get(value).firms
    setList(list)
  }

  const [selectedIDs, setSelectedIDs] = useState([])

  const [custom, setCustom] = useState(false)
  useEffect(() => {
    const isCustom = listOptions[0].value !== -1
    setCustom(isCustom)
  }, [listOptions])

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
        {!isEmpty(selectedIDs) && (
          <div className="firms__actions">
            {custom && (
              <IconButton
                className="firms__action--save firms__action"
                icon={faSave}
              />
            )}
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
        )}
      </div>

      {!isEmpty(error) && <Errors errors={error} />}

      <Table
        firms={firms}
        listData={list}
        selectedIDs={selectedIDs}
        setSelectedIDs={setSelectedIDs}
      />
    </main>
  )
}

const mapStateToProps = ({ user, errors }) => ({ user, errors })
export default connect(mapStateToProps, { putLists })(Firms)
