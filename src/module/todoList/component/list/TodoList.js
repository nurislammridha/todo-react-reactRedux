import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import EditTodoList from '../edit/EditTodoList'
import { confirmDeleteTask, editTodoList, getTodoList, MarkAsComplete, setEditTodoList, setFalseMarkas } from '../../_redux/action/TodoListAction'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showToast } from '../../../../utils/ShowToaster'
import { ToastContainer, toast } from 'react-toastify';

const TodoList = (props) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [editId, setEditId] = useState();
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const todoList = useSelector(state => state.todoListInfo.todoList)
    const markAsCompleted = useSelector(state => state.todoListInfo.markAsCompleted)

    // const markAsComplete=()=>{

    // }
    const handleTextInput = (name, value) => {
        // dispatch(handleChangeText(name, value))
    }
    const handleEditData = (id) => {
        setShow(true);
        setEditId(id);
        dispatch(setEditTodoList(id))

    }
    const handleDeleteTask = (id) => {
        confirmAlert({
            title: "Confirm To Delete",
            message: `Are you sure to delete..?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => dispatch(confirmDeleteTask(id)),
                },
                {
                    label: "No"
                }
            ]
        });
    }
    console.log('todoList :>> ', todoList);
    useEffect(() => {
        dispatch(getTodoList())
        dispatch(setFalseMarkas())
    }, [markAsCompleted, dispatch])
    useEffect(() => {
        dispatch(getTodoList())
    }, [])
    return (
        <>
            <h1 className="alert alert-secondary mt-4">All Task List</h1>
            {(todoList === null) && (
                <>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </>
            )}
            {todoList && (todoList !== null) && (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Task Name</th>
                                <th>Start Date</th>
                                <th>End date</th>
                                <th>Status</th>
                                <th className="d-flex justify-content-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todoList.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.task_name}</td>
                                    <td>{item.start_date}</td>
                                    <td>{item.end_date}</td>
                                    {(item.status === 0) && (
                                        <td className="text-danger">Running</td>
                                    )}
                                    {(item.status === 1) && (
                                        <td className="text-success">Completed</td>
                                    )}

                                    <td className="d-flex justify-content-center">
                                        {(item.status === 0) && (
                                            <>
                                                <a href
                                                    className="btn btn-primary"
                                                    onClick={() => handleEditData(item.id)}
                                                >
                                                    Edit
                                                </a>
                                                <a href
                                                    className="btn btn-danger ml-1"
                                                    onClick={() => handleDeleteTask(item.id)}
                                                >
                                                    Delete
                                                </a>
                                                <a href
                                                    className="btn btn-success ml-1"
                                                    onClick={() => dispatch(MarkAsComplete(item.id))}
                                                >

                                                    Mark As Complete
                                                </a>

                                            </>
                                        )}
                                        {(item.status === 1) && (
                                            <>
                                                <p className="invisible">No action</p>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    <ToastContainer />
                </>
            )}



            <Modal show={show} onHide={handleClose}>
                <EditTodoList handleClose={() => handleClose()} editId={editId} />
            </Modal>
        </>
    );
}

export default TodoList;