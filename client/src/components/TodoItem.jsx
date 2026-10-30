import { useState } from 'react';
import { Square, CheckSquare, Edit, Trash, AlertTriangle } from 'lucide-react';

function TodoItem({ todo, onToggleDone, onEdit, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(todo._id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <li className={`flex items-center justify-between p-4 rounded-md border border-border dark:border-gray-700 transition-all bg-white dark:bg-gray-800 hover:shadow-md ${
        todo.done ? 'opacity-60' : ''
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => onToggleDone(todo._id)}
            className={`flex-shrink-0 transition-colors border rounded-md p-1 ${
              todo.done
                ? 'text-muted-foreground border-transparent hover:text-green-500 hover:border-green-500'
                : 'text-primary border-transparent hover:text-green-500 hover:border-green-500'
            }`}
            aria-label={todo.done ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {todo.done ? (
              <CheckSquare className="h-5 w-5" />
            ) : (
              <Square className="h-5 w-5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <span className={`block truncate ${
              todo.done ? 'line-through text-muted-foreground' : ''
            }`}>
              {todo.title}
            </span>
            {todo.description && (
              <span className={`block text-sm truncate ${
                todo.done ? 'line-through text-muted-foreground' : 'text-muted-foreground'
              }`}>
                {todo.description}
              </span>
            )}
          </div>
        </div>

        <div className="flex rounded-md overflow-hidden flex-shrink-0 ml-2">
          <button
            onClick={() => onEdit(todo)}
            className="bg-gray-100 hover:bg-green-100 dark:hover:bg-green-700 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 hover:border-green-300 p-2 text-gray-400 dark:text-gray-300 transition-colors hover:text-green-500 rounded-l-md"
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-gray-100 hover:bg-red-100 dark:hover:bg-red-500/30 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-red-300 p-2 text-gray-400 dark:text-gray-300 transition-colors hover:text-red-500 rounded-r-md"
            aria-label="Delete task"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </li>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Delete Task</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete "<span className="text-foreground font-medium">{todo.title}</span>"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoItem;
