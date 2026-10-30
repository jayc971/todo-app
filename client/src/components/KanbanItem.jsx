import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Trash } from 'lucide-react';
import { useState } from 'react';

function KanbanItem({ todo, onEdit, onDelete, isDragging }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging
  } = useSortable({ id: todo._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    onDelete(todo._id);
    setShowDeleteConfirm(false);
  };

  if (isDragging) {
    return (
      <div className="bg-card border border-border rounded-md p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground truncate">{todo.title}</p>
        {todo.description && (
          <p className="text-xs text-muted-foreground mt-1 truncate">{todo.description}</p>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-card border border-border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow ${
          isSortableDragging ? 'opacity-50' : ''
        }`}
      >
        <div className="flex items-start gap-2">
          <button
            {...attributes}
            {...listeners}
            className="mt-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{todo.title}</p>
            {todo.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{todo.description}</p>
            )}
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => onEdit(todo)}
              className="p-1 text-muted-foreground hover:text-green-500 transition-colors"
              aria-label="Edit task"
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
              aria-label="Delete task"
            >
              <Trash className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">Delete Task</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete "{todo.title}"?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors"
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

export default KanbanItem;
