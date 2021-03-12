import * as Types from "../types/Types";
const initialState = {
    todoTextInput: {
        task_name: "",
        start_date: "",
        end_date: "",
        status: 0
    },
    editTodoTextInput: {
        task_name: "",
        start_date: "",
        end_date: "",
        status: 0
    },
    todoList: null,
    isSubmiting: false,
    test: "Nurislam"
};
const TodoListReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case Types.TODO_TEXT_INPUT:
            const todoTextInput = { ...state.todoTextInput };
            todoTextInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                todoTextInput: todoTextInput
            };
        case Types.GET_TODO_LIST:
            return {
                ...state,
                todoList: action.payload
            }
        case Types.MARK_AS_COMPLETED:
            return {
                ...state,
                markAsCompleted: true
            }
        case Types.SET_MARK_AS:
            return {
                ...state,
                markAsCompleted: false
            }
        case Types.IS_SUBMITTING:
            if (!action.payload) {
                return {
                    ...state,
                    todoTextInput: initialState.todoTextInput
                }
            }
            return {
                ...state,
                isSubmiting: false
            }
        case Types.SET_EDIT_DATA:
            const editTodoTextInput = {
                task_name: action.payload.task_name,
                start_date: action.payload.start_date,
                end_date: action.payload.end_date,
                status: 0
            }
            return {
                ...state,
                editTodoTextInput: editTodoTextInput
            }
        case Types.CHANGE_EDIT_LIST:
            const newEditTodoTextInput = { ...state.editTodoTextInput }
            newEditTodoTextInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                editTodoTextInput: newEditTodoTextInput
            }
        default:
            break;
    }
    return newState;
};
export default TodoListReducer;
