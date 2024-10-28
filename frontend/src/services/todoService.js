import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createTodo = async (todoData) => {
  const response = await axios.post(API_URL, todoData);
  return response.data;
};

const updateTodo = async (id, todoData) => {
  const response = await axios.put(`${API_URL}/${id}`, todoData);
  return response.data;
};

const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const todoService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
