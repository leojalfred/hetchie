import {
  SET_DATA,
  ADD_LOCATION,
  ADD_PRACTICE,
  CLEAR_DATA,
} from '../actions/types'
import sort from 'utils/sort'

const initialState = { locations: [], practices: [] }
export default function data(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DATA:
      return {
        ...state,
        firms: payload.firms,
        locations: payload.locations,
        practices: payload.practices,
        qualifications: payload.qualifications,
        rankings: payload.rankings,
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
    case CLEAR_DATA:
      return {}
    default:
      return state
  }
}
