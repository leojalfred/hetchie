import {
  ADD_FIRM,
  ADD_LOCATION,
  ADD_PRACTICE,
  ADD_QUALIFICATION, ADD_RANKING, CLEAR_DATA, SET_DATA
} from '../actions/types'
import sort from '../utils/sort'

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
    case ADD_RANKING:
      const rankings = [...state.rankings, payload].sort(sort)

      return {
        ...state,
        rankings,
      }
    case ADD_FIRM:
      const firms = [...state.firms, payload].sort(sort)

      return {
        ...state,
        firms,
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
    case ADD_QUALIFICATION:
      const qualifications = [...state.qualifications, payload].sort(sort)

      return {
        ...state,
        qualifications,
      }
    case CLEAR_DATA:
      return {}
    default:
      return state
  }
}
