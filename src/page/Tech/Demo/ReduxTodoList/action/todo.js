import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../config/const'

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