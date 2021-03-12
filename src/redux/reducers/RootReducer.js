import { combineReducers } from "redux";
import TodoListReducer from "../../module/todoList/_redux/reducer/TodoListReducer";

// combine all of the reducers here
const rootReducer = combineReducers({
    // CounterReducer: CounterReducer,
    // TaskReducer: TaskReducer,
    todoListInfo: TodoListReducer
});

export default rootReducer;
