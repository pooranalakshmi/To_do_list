import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './todoitem';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const navigate = useNavigate();

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

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodo) return;

        try {
            const response = await axios.post('http://localhost:5000/tasks/add', { todo: newTodo, isCompleted: false });
            setTodos([response.data, ...todos]); 
            setNewTodo(''); 
            navigate('/'); 
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const toggleComplete = async (id) => {
        const todo = todos.find(todo => todo._id === id);
        if (todo) {
            try {
                const response = await axios.patch(`http://localhost:5000/tasks/${id}`, { isCompleted: !todo.isCompleted });
                setTodos(todos.map(t => (t._id === id ? response.data : t)));
            } catch (error) {
                console.error('Error toggling task completion:', error);
            }
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    
    const sortedTodos = todos.sort((a, b) => {
        return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
    });

    return (
        <div className="container"> {}
            <h1>ToDo List</h1>
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task"
                />
                <button type="submit" className="add">Add</button>
            </form>
            <ul>
                {sortedTodos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onToggleComplete={toggleComplete}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
