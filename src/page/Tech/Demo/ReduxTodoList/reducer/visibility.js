import { SET_VISIBILITY } from '../config/const'

export default function visibility (state = 'ALL', action) {
  switch (action.type) {
    case SET_VISIBILITY:
      return action.visibility
    default:
      return state
  }
}