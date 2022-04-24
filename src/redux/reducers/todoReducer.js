/* eslint-disable import/no-anonymous-default-export */

import {
  ADD_TODO,
  CLEAR_SINGLE_TODO,
  DELETE_TODO,
  GET_TODO_LIST,
  UPDATE_TODO,
  GET_SINGLE_TODO,
  TITLE_SORT_ASC,
  TITLE_SORT_DESC,
  UPDATE_TODO_IS_COMPLETED,
} from "redux/types";

const initialState = {
  todoList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODO_LIST: {
      return { ...state, todoList: [...(state.todoList || [])] };
    }

    case GET_SINGLE_TODO: {
      let data = {};
      if (action.id) {
        data = state.todoList.filter((d) => d.id === action.id);
      }
      return { ...state, singleTodo: data?.[0] };
    }

    case CLEAR_SINGLE_TODO: {
      return { ...state, singleTodo: {} };
    }

    case ADD_TODO: {
      return {
        ...state,
        todoList: [...state.todoList, action.data],
      };
    }

    case UPDATE_TODO: {
      const newtodoList = [...(state.todoList || [])];
      const updatedIndex = newtodoList.findIndex(
        (todo) => todo.id === action.data.id
      );
      if (updatedIndex > -1) {
        newtodoList[updatedIndex].title = action.data.title;
        newtodoList[updatedIndex].description = action.data.description;
        newtodoList[updatedIndex].isEdited = action.data.isEdited;
      }
      return {
        ...state,
        todoList: newtodoList,
      };
    }

    case DELETE_TODO: {
      let newtodoList = [...(state.todoList || [])];
      newtodoList = newtodoList.filter((todo) => !action.ids.includes(todo.id));

      return {
        ...state,
        todoList: newtodoList,
      };
    }

    case UPDATE_TODO_IS_COMPLETED: {
      const newtodoList = [...(state.todoList || [])];
      const updatedIndex = newtodoList.findIndex(
        (todo) => todo.id === action.data.id
      );
      if (updatedIndex > -1) {
        newtodoList[updatedIndex].isCompleted = !action.data.isCompleted;
      }
      return {
        ...state,
        todoList: newtodoList,
      };
    }

    case TITLE_SORT_ASC: {
      const sortedData = state.todoList.sort(function (a, b) {
        const titleA = a?.title?.toUpperCase();
        const titleB = b?.title?.toUpperCase();
        return titleA === titleB ? 0 : titleA > titleB ? 1 : -1;
      });

      return {
        ...state,
        todoList: sortedData,
      };
    }

    case TITLE_SORT_DESC: {
      const sortedData = state.todoList.sort(function (a, b) {
        const titleA = a?.title?.toUpperCase();
        const titleB = b?.title?.toUpperCase();
        return titleA === titleB ? 0 : titleA > titleB ? -1 : 1;
      });

      return {
        ...state,
        todoList: sortedData,
      };
    }

    default:
      return state;
  }
}
