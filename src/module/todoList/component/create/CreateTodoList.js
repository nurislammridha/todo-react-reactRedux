import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { SubmitTodoInput, todoTextInput } from '../../_redux/action/TodoListAction'
import { ToastContainer } from 'react-toastify'

const CreateTodoList = () => {
    const dispatch = useDispatch()
    const textInputData = useSelector(state => state.todoListInfo.todoTextInput)
    const isSubmiting = useSelector(state => state.todoListInfo.isSubmiting)
    console.log('textInputData :>> ', textInputData);
    const handleChangeTextInput = (name, value) => {
        dispatch(todoTextInput(name, value))
    }
    const handleSubmitData = (data) => {
        dispatch(SubmitTodoInput(data));
    }
    console.log('isSubmiting :>> ', isSubmiting);
    useEffect(() => {
        let isSubmiting = false
    }, [])
    return (
        <>
            <h1 className="alert alert-secondary mt-4">Add New Task</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Task Name"
                        name="task_name"
                        value={textInputData.task_name}
                        onChange={(e) => handleChangeTextInput("task_name", e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter Start Date"
                        name="start_date"
                        value={textInputData.start_date}
                        onChange={(e) => handleChangeTextInput("start_date", e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter End Date"
                        name="end_date"
                        value={textInputData.end_date}
                        onChange={(e) => handleChangeTextInput("end_date", e.target.value)}
                    />
                </Form.Group>

                {!isSubmiting && (
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSubmitData(textInputData);
                        }}
                    >
                        Submit
                    </Button>
                )}
                {isSubmiting && (
                    <Button
                        variant="primary"
                    >
                        Submitting
                    </Button>
                )}
            </Form>
            <ToastContainer />
        </>
    );
}

export default CreateTodoList;