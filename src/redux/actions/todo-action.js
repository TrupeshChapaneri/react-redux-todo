import {
  ADD_TODO,
  CLEAR_SINGLE_TODO,
  DELETE_TODO,
  GET_TODO_LIST,
  GET_SINGLE_TODO,
  TITLE_SORT_ASC,
  TITLE_SORT_DESC,
  UPDATE_TODO,
  UPDATE_TODO_IS_COMPLETED,
} from "redux/types";

export function getTodoList() {
  return {
    type: GET_TODO_LIST,
  };
}

export function addTodo(data) {
  return {
    type: ADD_TODO,
    data,
  };
}

export function getSingleTodo(id) {
  return {
    type: GET_SINGLE_TODO,
    id,
  };
}

export function deleteTodo(ids) {
  return {
    type: DELETE_TODO,
    ids,
  };
}

export function updateTodo(data) {
  return {
    type: UPDATE_TODO,
    data,
  };
}

export function clearSingleTodo() {
  return {
    type: CLEAR_SINGLE_TODO,
  };
}

export function updateTodoIsCompleted(data) {
  return {
    type: UPDATE_TODO_IS_COMPLETED,
    data,
  };
}

export function titleSortAsc() {
  return {
    type: TITLE_SORT_ASC,
  };
}

export function titleSortDesc() {
  return {
    type: TITLE_SORT_DESC,
  };
}
