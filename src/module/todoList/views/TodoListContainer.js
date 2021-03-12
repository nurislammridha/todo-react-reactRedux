import React from 'react';
import CreateTodoList from '../component/create/CreateTodoList';
import TodoList from '../component/list/TodoList';
const TodoListContainer = () => {
    return (
        <>
            <div className="container">
                <CreateTodoList />
                <TodoList />
            </div>
        </>
    );
}

export default TodoListContainer;