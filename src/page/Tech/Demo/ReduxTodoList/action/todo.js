import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SELECTE_ALL_TODOS,
  CLEAR_ALL_TODOS,
  CLEAR_SELECTED_TODOS
} from '../config/const'

export const addTodo = ({ value }) => {
  return {
    type: ADD_TODO,
    value
  }
}
export const updateTodo = ({ id, ...status }) => {
  return {
    type: UPDATE_TODO,
    id,
    ...status
  }
}

export const removeTodo = ({ id }) => {
  return {
    type: REMOVE_TODO,
    id
  }
}

export function selectAllTodos (selectAll) {
  return {
    type: SELECTE_ALL_TODOS,
    selectAll
  }
}

export function clearAllTodos () {
  return {
    type: CLEAR_ALL_TODOS
  }
}

export function clearSelectedTodos () {
  return {
    type: CLEAR_SELECTED_TODOS
  }
}
