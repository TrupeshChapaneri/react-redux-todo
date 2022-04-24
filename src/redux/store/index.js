import { combineReducers, createStore } from "redux";
import todoReducer from "../reducers/todoReducer";

// Here using future proof for future proof
const rootReducer = combineReducers({
  todoReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
