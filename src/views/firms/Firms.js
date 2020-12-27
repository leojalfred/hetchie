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
  const [searchedFirms, setSearchedFirms] = useState()
  const [listedFirms, setListedFirms] = useState([])
  useEffect(() => {
    async function getFirms() {
      const { data } = await axios.get('/api/firms')
      setFirms(data)

      const ranked = rank(
        user.data.gpa,
        user.data.locations,
        user.data.practices,
        data
      )
      setSearchedFirms(ranked)
      setListedFirms(ranked)
    }

    getFirms()
  }, [user.data.gpa, user.data.locations, user.data.practices])

  const initialOption = { value: -1, label: 'Search results' }
  const [selectedList, setSelectedList] = useState(initialOption)
  const [options, setOptions] = useState([initialOption])
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

  function getListFirms(id) {
    const matchID = list => list._id === id
    const listedFirms = user.data.lists.find(matchID).firms

    return listedFirms
  }

  function switchList(selected) {
    setSelectedList(selected)

    if (selected.value === -1) setListedFirms(searchedFirms)
    else {
      const listedFirms = getListFirms(selected.value)
      setListedFirms(listedFirms)
    }
  }

  const [selectedIDs, setSelectedIDs] = useState([])

  const [onSearch, setOnSearch] = useState(true)
  useEffect(() => {
    const isOnSearch = selectedList.value === -1
    setOnSearch(isOnSearch)
  }, [selectedList.value])

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
              value={selectedList}
              onChange={switchList}
            />

            {/* <button className="firms__recent">West Coast</button>
            <button className="firms__recent">East Coast</button>
            <button className="firms__recent">Reaches</button> */}
          </div>

          <Actions
            onSearch={onSearch}
            getListFirms={getListFirms}
            selectedListID={selectedList.value}
            switchList={switchList}
            listedFirms={listedFirms}
            setListedFirms={setListedFirms}
            selectedIDs={selectedIDs}
            setSelectedIDs={setSelectedIDs}
            setMessage={setMessage}
            options={options}
          />
        </div>

        <Error className="firms__error" message={message} />

        {firms && (
          <Table
            firms={firms}
            listedFirms={listedFirms}
            setListedFirms={setListedFirms}
            selectedIDs={selectedIDs}
            setSelectedIDs={setSelectedIDs}
            onSearch={onSearch}
          />
        )}
      </Container>
    </main>
  )
}

const mapStateToProps = ({ user, error }) => ({ user, error })
export default connect(mapStateToProps)(Firms)
