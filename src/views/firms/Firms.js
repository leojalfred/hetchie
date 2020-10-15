import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import empty from 'utils/empty'
import rank from 'utils/firms'
import Container from 'components/Container'
import Select from 'components/Select'
import Actions from './components/Actions'
import Error from 'components/Error'
import Table from './components/Table'
import './Firms.scss'

function Firms({ user, error }) {
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!empty(error)) setMessage(error)
    else setMessage('')
  }, [error])

  const [firms, setFirms] = useState()
  const [list, setList] = useState([])
  useEffect(() => {
    async function getFirms() {
      const { data } = await axios.get('/api/firms')
      setFirms(data)

      const ranked = rank(user, data)
      setList(ranked)
    }
    getFirms()
  }, [user])

  const [options, setOptions] = useState([
    { value: -1, label: 'Search results' },
  ])
  useEffect(() => {
    let formattedOptions = [{ value: -1, label: 'Search results' }]
    if (!empty(user.data.lists)) {
      const mappedOptions = []
      for (const { _id, name } of user.data.lists)
        mappedOptions.push({ value: _id, label: name })

      formattedOptions = [...formattedOptions, ...mappedOptions]
    }

    setOptions(formattedOptions)
  }, [user.data.lists])

  function onChange({ value }) {
    const changedID = list => list._id === value
    const list = user.data.lists.find(changedID).firms

    setList(list)
  }

  const [selectedIDs, setSelectedIDs] = useState([])

  const [onSearch, setOnSearch] = useState(true)
  useEffect(() => {
    const isOnSearch = options[0].value === -1
    setOnSearch(isOnSearch)
  }, [options])

  return (
    <main className="firms">
      <Container>
        <h1 className="firms__heading">Firms List</h1>

        <div className="firms__topline">
          <div className="firms__selectors">
            <Select
              className="firms__select"
              options={options}
              placeholder="Firms list"
              value={options[0]}
              onChange={onChange}
            />

            <button className="firms__recent">West Coast</button>
            <button className="firms__recent">East Coast</button>
            <button className="firms__recent">Reaches</button>
          </div>

          <Actions
            setMessage={setMessage}
            options={options}
            setOptions={setOptions}
            onSearch={onSearch}
            selectedIDs={selectedIDs}
          />
        </div>

        {message && <Error message={message} />}

        <Table
          firms={firms}
          listData={list}
          selectedIDs={selectedIDs}
          setSelectedIDs={setSelectedIDs}
          onSearch={onSearch}
        />
      </Container>
    </main>
  )
}

const mapStateToProps = ({ user, error }) => ({ user, error })
export default connect(mapStateToProps)(Firms)
