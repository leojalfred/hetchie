import axios from 'axios'
import sort from 'utils/sort'
import { SET_DATA, ADD_LOCATION, ADD_PRACTICE } from './types'
import { setError } from './shared'

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
    setError(dispatch, '')
  } catch ({ response }) {
    setError(dispatch, response.data)
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
}
export const putName = (
  target,
  name,
  selected,
  setSelected
) => async dispatch => {
  try {
    const { data } = await axios.put(targets[target].endpoint, { name })
    const payload = { value: data._id, label: data.name }
    setSelected([...selected, payload])

    dispatch({ type: targets[target].type, payload })
    setError(dispatch, '')
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}
