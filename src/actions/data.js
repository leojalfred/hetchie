import axios from 'axios'
import sort from 'utils/sort'
import {
  SET_DATA,
  ADD_RANKING,
  ADD_FIRM,
  ADD_LOCATION,
  ADD_PRACTICE,
  ADD_QUALIFICATION,
} from './types'
// import { setError } from './shared'

export const getData = () => async dispatch => {
  try {
    const endpoints = [
      'firms',
      'locations',
      'practices',
      'rankings',
      'qualifications',
    ]
    const promises = []
    for (const endpoint of endpoints)
      promises.push(axios.get(`/api/${endpoint}`))

    const responses = await Promise.all(promises)
    const payload = {}
    for (let i = 0; i < responses.length; i++) {
      const data = responses[i].data
      const dataOptions = data.map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      const sortedOptions = dataOptions.sort(sort)

      payload[endpoints[i]] = sortedOptions
    }

    dispatch({ type: SET_DATA, payload })
    // setError(dispatch, '')
  } catch ({ response }) {
    // setError(dispatch, response.data)
  }
}

export const postRanking = (ranking, setNotification) => async dispatch => {
  try {
    const { data } = await axios.post('/api/rankings', ranking)
    const payload = { value: data._id, label: data.name }

    setNotification({
      type: 'success',
      text: 'New ranking successfully created',
    })
    dispatch({ type: ADD_RANKING, payload })
  } catch (error) {
    setNotification({
      type: 'failure',
      text: 'Failed to create new ranking',
    })

    console.log(error)
  }
}

export const postFirm = (firm, setNotification) => async dispatch => {
  try {
    const { data } = await axios.post('/api/firms', firm)
    const payload = { value: data._id, label: data.name }

    setNotification({
      type: 'success',
      text: 'New firm successfully created',
    })
    dispatch({ type: ADD_FIRM, payload })
  } catch (error) {
    setNotification({
      type: 'failure',
      text: 'Failed to create new firm',
    })

    console.log(error)
  }
}

const targets = {
  location: {
    endpoint: '/api/locations',
    type: ADD_LOCATION,
  },
  practice: {
    endpoint: '/api/practices',
    type: ADD_PRACTICE,
  },
  qualification: {
    endpoint: '/api/qualifications',
    type: ADD_QUALIFICATION,
  },
}
export const postName =
  (target, name, selected, setSelected, i) => async dispatch => {
    try {
      const { data } = await axios.post(targets[target].endpoint, { name })
      const payload = { value: data._id, label: data.name }

      if (selected === null) setSelected([payload])
      else setSelected([...selected, payload])

      dispatch({ type: targets[target].type, payload })
      // setError(dispatch, '')
    } catch (error) {
      console.log(error)
    }
  }
