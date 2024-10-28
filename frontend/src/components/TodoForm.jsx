import { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { todoService } from '../services/todoService';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useTodo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTodo = await todoService.createTodo({ title });
      setTodos([newTodo, ...todos]);
      setTitle('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-6'>
      <div className='flex'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Add a new todo'
          className='flex-1 p-2 border rounded-l'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600'
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
