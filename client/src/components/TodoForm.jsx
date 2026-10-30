import { useState, useEffect } from 'react';
import { PlusCircle, Check, X } from 'lucide-react';

function TodoForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setErrors({});
  }, [initialData]);

  function validate() {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    if (description.trim().length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim()
      });

      if (!isEditing) {
        setTitle('');
        setDescription('');
      }
    } catch {
      // Error is handled by parent
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    setTitle('');
    setDescription('');
    setErrors({});
    onCancel?.();
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className={`w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground ${
              errors.title ? 'border-red-500' : 'border-input'
            }`}
            disabled={submitting}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className={`w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none ${
              errors.description ? 'border-red-500' : 'border-input'
            }`}
            disabled={submitting}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
            {submitting ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-0">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task"
          className={`flex-1 p-4 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground ${
            errors.title ? 'border-red-500' : 'border-input'
          }`}
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={!title.trim() || submitting}
          className="p-4 bg-gray-100 hover:bg-green-100 dark:hover:bg-green-700 dark:bg-gray-700 border border-l-0 border-gray-400 dark:border-gray-600 hover:border-green-300 text-gray-400 dark:text-gray-300 transition-colors hover:text-green-500 disabled:opacity-50 disabled:pointer-events-none rounded-r-md"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>
      {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
    </form>
  );
}

export default TodoForm;
