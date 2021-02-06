import axios from 'axios'
import arraysEqual from 'utils/arraysEqual'
import sort from 'utils/sort'
import { setError } from './shared'
import {
  SET_LOCATIONS_AND_PRACTICES,
  SET_QUALIFICATIONS,
  ADD_LOCATION,
  ADD_PRACTICE,
} from './types'

export const getData = endpoints => async dispatch => {
  try {
    const promises = []
    if (typeof endpoints === 'object') {
      for (const endpoint of endpoints)
        promises.push(axios.get(`/api/${endpoint}`))
    } else if (typeof endpoints === 'string') {
      promises.push(axios.get(`/api/${endpoints}`))
    }

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

    let type
    if (arraysEqual(endpoints, ['locations', 'practices']))
      type = SET_LOCATIONS_AND_PRACTICES
    else if (endpoints === 'qualifications') type = SET_QUALIFICATIONS
    else return

    dispatch({ type, payload })
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
