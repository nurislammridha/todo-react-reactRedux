import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import { editTodoList, updateTodoList } from '../../_redux/action/TodoListAction'

const EditTodoList = (props) => {
    const dispatch = useDispatch()
    const { handleClose } = props;
    const editTodoTextInput = useSelector(state => state.todoListInfo.editTodoTextInput)
    console.log('editTodoTextInput :>> ', editTodoTextInput);
    // ,props.editId
    const handleChangeText = (name, value) => {

        dispatch(editTodoList(name, value))
    }
    const handleUpdate = (data) => {
        dispatch(updateTodoList(data, props.editId))
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Task Name"
                            name="task_name"
                            value={editTodoTextInput.task_name}
                            onChange={(e) => handleChangeText("task_name", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter Start Date"
                            name="start_date"
                            value={editTodoTextInput.start_date}
                            onChange={(e) => handleChangeText("start_date", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter End Date"
                            name="end_date"
                            value={editTodoTextInput.end_date}
                            onChange={(e) => handleChangeText("end_date", e.target.value)}
                        />
                    </Form.Group>
                    {/* 
                    <Button variant="primary" type="submit">
                        Submit
                </Button> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
          </Button>
                <Button variant="primary"
                    onClick={() => {
                        handleUpdate(editTodoTextInput);
                        handleClose();
                    }}>
                    Update
                 </Button>
            </Modal.Footer>
        </>
    );
}

export default EditTodoList;