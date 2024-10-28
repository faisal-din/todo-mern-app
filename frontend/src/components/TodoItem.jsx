import { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { todoService } from '../services/todoService';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const { todos, setTodos } = useTodo();

  const handleToggle = async () => {
    try {
      const updatedTodo = await todoService.updateTodo(todo._id, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === todo._id ? updatedTodo : t)));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editText.trim()) return;

    try {
      const updatedTodo = await todoService.updateTodo(todo._id, {
        title: editText,
      });
      setTodos(todos.map((t) => (t._id === todo._id ? updatedTodo : t)));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await todoService.deleteTodo(todo._id);
      setTodos(todos.filter((t) => t._id !== todo._id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <li className='flex items-center justify-between p-3 border rounded'>
      {isEditing ? (
        <div className='flex flex-1 mr-2'>
          <input
            type='text'
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className='flex-1 p-1 border rounded'
          />
          <button
            onClick={handleUpdate}
            className='ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'
          >
            Save
          </button>
        </div>
      ) : (
        <div className='flex items-center flex-1'>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={handleToggle}
            className='mr-2'
          />
          <span className={todo.completed ? 'line-through text-gray-500' : ''}>
            {todo.title}
          </span>
        </div>
      )}

      {!isEditing && (
        <div className='flex space-x-2'>
          <button
            onClick={() => setIsEditing(true)}
            className='px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600'
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
