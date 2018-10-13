import { SET_VISIBILITY } from '../config/const'

export function setVisibility (visibility) {
  return {
    type: SET_VISIBILITY,
    visibility
  }
}