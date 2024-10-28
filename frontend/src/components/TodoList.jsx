import React, { useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import { todoService } from '../services/todoService';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, setTodos } = useTodo();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await todoService.getTodos();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [setTodos]);

  return (
    <ul className='space-y-3'>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
