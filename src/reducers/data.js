import { SET_LOCATIONS_AND_PRACTICES } from '../actions/types'

const initialState = { locations: [], practices: [] }
export default function data(state = initialState, { type, payload }) {
  switch (type) {
    case SET_LOCATIONS_AND_PRACTICES:
      return {
        ...state,
        locations: payload.locations,
        practices: payload.practices,
      }
    default:
      return state
  }
}
