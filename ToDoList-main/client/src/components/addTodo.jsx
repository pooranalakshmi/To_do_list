import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './todoitem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tasks');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <div>
            <h1>ToDo List</h1>
            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
