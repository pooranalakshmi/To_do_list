import PropTypes from 'prop-types';
import './styles.css'; 

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
    return (
        <li className={todo.isCompleted ? 'completed' : ''}>
            <span>{todo.todo}</span>
            <div>
                <button
                    className={todo.isCompleted ? 'undo' : 'complete'}
                    onClick={() => onToggleComplete(todo._id)}
                >
                    {todo.isCompleted ? 'Undo' : 'Complete'}
                </button>
                <button className="delete" onClick={() => onDelete(todo._id)}>Delete</button>
            </div>
        </li>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        todo: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
    }).isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
