import * as Types from '../types/Types'
import axios from 'axios'
import { showToast } from '../../../../utils/ShowToaster';
import { ToastContainer, toast } from 'react-toastify';


export const todoTextInput = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.TODO_TEXT_INPUT, payload: formData })
}

export const getTodoList = () => (dispatch) => {
    const url = `https://goldenharvest-api.herokuapp.com/api/todos`;
    // const url = `http://127.0.0.1:8000/api/todos`;
    // const url = `${process.env.REACT_APP_API_URL}api/todos`;
    // const url = `${process.env.REACT_APP_API_KEY}api/todos`;
    console.log('url :>> ', url);
    console.log('process.env :>> ', process.env);
    axios.get(url).then(
        (res) => {
            dispatch({ type: Types.GET_TODO_LIST, payload: res.data })
        }
    )
}

export const MarkAsComplete = (id) => (dispatch) => {
    const data = {
        status: 1
    };
    // const url = `http://127.0.0.1:8000/api/todos/${id}`
    const url = `https://goldenharvest-api.herokuapp.com/api/todos/${id}`

    axios.put(url, data).then(
        (res) => {
            if (res.data.status) {
                dispatch({ type: Types.MARK_AS_COMPLETED, payload: res.data.status })
            }
        }
    )
}
export const setFalseMarkas = () => (dispatch) => {
    dispatch({ type: Types.SET_MARK_AS, payload: false })
}
export const confirmDeleteTask = (id) => (dispatch) => {
    const url = `https://goldenharvest-api.herokuapp.com/api/todos/${id}`;
    // const url = `http://127.0.0.1:8000/api/todos/${id}`;
    // showToast('error', "hello");
    // toast("Wow so easy!");
    // return 0;
    axios.delete(url).then(
        (res) => {
            console.log('res :>> ', res);
            if (res.data.status) {
                dispatch({ type: Types.MARK_AS_COMPLETED, payload: res.data.status })
                showToast('success', res.data.message);
            }
        }
    )
}

export const SubmitTodoInput = (data) => (dispatch) => {

    if (data && data.task_name.length === 0) {
        showToast('success', "Task Name should not be empty");
        return 0
    }
    else if (data && data.start_date.length === 0) {
        showToast('success', "Start Date should not be empty");
        return 0
    }
    else if (data && data.end_date.length === 0) {
        showToast('success', "End Date should not be empty");
        return 0
    }
    else if (data && (data.end_date < data.start_date)) {
        showToast('success', "End Date should be greater");
        return 0
    }
    dispatch({ type: Types.IS_SUBMITTING, payload: true })
    const url = `https://goldenharvest-api.herokuapp.com/api/todos`;
    // const url = `http://127.0.0.1:8000/api/todos`;
    console.log('data :>> ', data);
    axios.post(url, data).then(
        (res) => {

            if (res.status) {
                dispatch({ type: Types.IS_SUBMITTING, payload: false })

                dispatch({ type: Types.MARK_AS_COMPLETED, payload: true })
                showToast('success', "Data has been inserted Successfuly");

            }

        }
    )

}
export const setEditTodoList = (id) => (dispatch) => {
    // const url = `http://127.0.0.1:8000/api/todos/${id}`
    const url = `https://goldenharvest-api.herokuapp.com/api/todos/${id}`
    axios.get(url).then(
        (res) => {
            console.log('res.data :>> ', res.data);
            dispatch({ type: Types.SET_EDIT_DATA, payload: res.data })
        }
    )
}
export const editTodoList = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value
    }
    dispatch({ type: Types.CHANGE_EDIT_LIST, payload: formData })
}
export const updateTodoList = (data, id) => async (dispatch) => {
    if (data && data.task_name.length === 0) {
        showToast('success', "Task Name should not be empty");
        return 0
    }
    else if (data && data.start_date.length === 0) {
        showToast('success', "Start Date should not be empty");
        return 0
    }
    else if (data && data.end_date.length === 0) {
        showToast('success', "End Date should not be empty");
        return 0
    }
    else if (data && (data.end_date < data.start_date)) {
        showToast('success', "End Date should be greater");
        return 0
    }
    const url = `https://goldenharvest-api.herokuapp.com/api/todos/${id}`
    await axios.put(url, data).then(
        (res) => {
            if (res.status) {
                dispatch({ type: Types.MARK_AS_COMPLETED, payload: true })
                showToast('success', res.data.message);
            }

        }
    )
}