import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SELECTE_ALL_TODOS,
  CLEAR_ALL_TODOS,
  CLEAR_SELECTED_TODOS
} from '../config/const'

export default function todo (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          value: action.value,
          id: Date.now(),
          complete: false,
          edit: false,
          select: false
        }
      ]
    case REMOVE_TODO: {
      const index = findIndexById(action.id, state)
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    }
    case UPDATE_TODO: {
      const index = findIndexById(action.id, state)
      const { type, ...status } = action
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], status),
        ...state.slice(index + 1)
      ]
    }
    case SELECTE_ALL_TODOS:
      return state.map(item => Object.assign({}, item, { select: action.selectAll === 'ALL' }))
    case CLEAR_SELECTED_TODOS:
      return state.filter(item => !item.select)
    case CLEAR_ALL_TODOS:
      return []
    default:
      return state
  }
}

const findIndexById = (id, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i
  }
  return -1
}