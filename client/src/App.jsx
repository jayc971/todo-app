import { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import KanbanBoard from './components/KanbanBoard';
import * as api from './api/todoApi';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [view, setView] = useState(() => {
    return localStorage.getItem('todoView') || 'kanban';
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todoView', view);
  }, [view]);

  async function fetchTodos() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTodo(todoData) {
    try {
      setError(null);
      const newTodo = await api.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function handleUpdateTodo(id, todoData) {
    try {
      setError(null);
      const updatedTodo = await api.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
      setEditingTodo(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function handleToggleDone(id) {
    try {
      setError(null);
      // Optimistic update
      setTodos(prev => prev.map(todo =>
        todo._id === id ? { ...todo, done: !todo.done, status: !todo.done ? 'done' : 'todo' } : todo
      ));

      const updatedTodo = await api.toggleTodoDone(id);
      setTodos(prev => prev.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
    } catch (err) {
      // Revert on error
      fetchTodos();
      setError(err.message);
    }
  }

  async function handleUpdateStatus(id, status) {
    try {
      setError(null);
      // Optimistic update
      setTodos(prev => prev.map(todo =>
        todo._id === id ? { ...todo, status, done: status === 'done' } : todo
      ));

      const updatedTodo = await api.updateTodoStatus(id, status);
      setTodos(prev => prev.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
    } catch (err) {
      // Revert on error
      fetchTodos();
      setError(err.message);
    }
  }

  async function handleDeleteTodo(id) {
    try {
      setError(null);
      // Optimistic update
      setTodos(prev => prev.filter(todo => todo._id !== id));
      await api.deleteTodo(id);
    } catch (err) {
      // Revert on error
      fetchTodos();
      setError(err.message);
    }
  }

  function handleEditTodo(todo) {
    setEditingTodo(todo);
    // Switch to list view for editing
    if (view === 'kanban') {
      setView('list');
    }
  }

  function handleCancelEdit() {
    setEditingTodo(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header view={view} onViewChange={setView} />

      <main className={`mx-auto p-4 ${view === 'kanban' ? 'max-w-6xl' : 'max-w-2xl'}`}>
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100"
            >
              &times;
            </button>
          </div>
        )}

        <TodoForm
          onSubmit={editingTodo
            ? (data) => handleUpdateTodo(editingTodo._id, data)
            : handleCreateTodo
          }
          initialData={editingTodo}
          onCancel={editingTodo ? handleCancelEdit : undefined}
        />

        {loading ? (
          <p className="text-muted-foreground text-center py-8">Loading todos...</p>
        ) : view === 'kanban' ? (
          <KanbanBoard
            todos={todos}
            onUpdateStatus={handleUpdateStatus}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ) : (
          <TodoList
            todos={todos}
            onToggleDone={handleToggleDone}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </main>
    </div>
  );
}

export default App;
