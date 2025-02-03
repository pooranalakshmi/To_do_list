import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/todolist';
import AddTodo from './components/addTodo';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/add" element={<AddTodo />} />
            </Routes>
        </Router>
    );
};

export default App;
