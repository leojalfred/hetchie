import axios from 'axios'
import { setError } from './shared'
import { SET_LOCATIONS_AND_PRACTICES } from './types'

export const getLocationsAndPractices = () => async dispatch => {
  try {
    const endpoints = ['locations', 'practices']
    const promises = []
    for (const endpoint of endpoints)
      promises.push(axios.get(`/api/${endpoint}`))

    function sort(a, b) {
      if (a.label < b.label) return -1
      if (a.label > b.label) return 1
      return 0
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

    dispatch({
      type: SET_LOCATIONS_AND_PRACTICES,
      payload,
    })

    setError(dispatch, '')
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}
