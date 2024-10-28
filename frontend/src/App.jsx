import { TodoProvider } from './context/TodoContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <TodoProvider>
      <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold mb-6'>Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
