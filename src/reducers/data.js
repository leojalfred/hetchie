import {
  SET_LOCATIONS_AND_PRACTICES,
  ADD_LOCATION,
  ADD_PRACTICE,
} from '../actions/types'
import sort from 'utils/sort'

const initialState = { locations: [], practices: [] }
export default function data(state = initialState, { type, payload }) {
  switch (type) {
    case SET_LOCATIONS_AND_PRACTICES:
      return {
        ...state,
        locations: payload.locations,
        practices: payload.practices,
      }
    case ADD_LOCATION:
      const locations = [...state.locations, payload].sort(sort)

      return {
        ...state,
        locations,
      }
    case ADD_PRACTICE:
      const practices = [...state.practices, payload].sort(sort)

      return {
        ...state,
        practices,
      }
    default:
      return state
  }
}
