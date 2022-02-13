import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { connect } from 'react-redux'
import Container from '../../components/Container'
import Error from '../../components/Error'
import Select from '../../components/Select'
import empty from '../../utils/empty'
import rank from '../../utils/firms'
import Actions from './components/Actions'
import Table from './components/Table'
import './Firms.scss'

function Firms({ user, error }) {
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!empty(error)) setMessage(error)
    else setMessage('')
  }, [error])

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

  const [onSearch, setOnSearch] = useState(true)
  useEffect(() => {
    const isOnSearch = selectedList.value === -1
    setOnSearch(isOnSearch)
  }, [selectedList.value])

  const initialized = useRef(false)
  const [firms, setFirms] = useState()
  const [searchedFirms, setSearchedFirms] = useState()
  const [listedFirms, setListedFirms] = useState([])
  useEffect(() => {
    async function getFirms() {
      const {
        data: { firms },
      } = await axios.get('/api/schools', {
        params: { id: user.data.school },
      })

      const firmsMap = firms.reduce((firmsAccumulator, firm) => {
        const { links, name, rankings } = firm.firm
        const officesMap = firm.offices.reduce((officesAccumulator, office) => {
          const { _id } = office
          officesAccumulator[`${_id}`] = { name, links, ...office, rankings }

          return officesAccumulator
        }, {})

        firmsAccumulator = { ...firmsAccumulator, ...officesMap }
        return firmsAccumulator
      }, {})
      setFirms(firmsMap)

      const ranked = rank(
        user.data.gpa,
        user.data.locations,
        user.data.practices,
        firmsMap
      )

      setSearchedFirms(ranked)
      if (!initialized.current || onSearch) {
        setListedFirms(ranked)
        initialized.current = true
      }
    }

    getFirms()
  }, [
    user.data.school,
    user.data.gpa,
    user.data.locations,
    user.data.practices,
    onSearch,
  ])

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
          </div>

          {!firms && <ThreeDots color="#ffa94d" width={30} />}

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
