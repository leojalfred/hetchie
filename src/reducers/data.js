import {
  SET_LOCATIONS_AND_PRACTICES,
  SET_RANKINGS_AND_QUALIFICATIONS,
  ADD_LOCATION,
  ADD_PRACTICE,
  CLEAR_DATA,
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
    case SET_RANKINGS_AND_QUALIFICATIONS:
      return {
        ...state,
        rankings: payload.rankings,
        qualifications: payload.qualifications,
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
