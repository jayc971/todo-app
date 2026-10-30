import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanItem from './KanbanItem';

const columnColors = {
  todo: 'border-t-blue-500',
  inprogress: 'border-t-yellow-500',
  done: 'border-t-green-500'
};

function KanbanColumn({ id, title, todos, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-50 dark:bg-gray-800/50 rounded-lg border-t-4 ${columnColors[id]} p-4 min-h-[300px] transition-colors ${
        isOver ? 'bg-gray-100 dark:bg-gray-700/50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-full">
          {todos.length}
        </span>
      </div>

      <SortableContext items={todos.map(t => t._id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Drop tasks here
            </p>
          ) : (
            todos.map(todo => (
              <KanbanItem
                key={todo._id}
                todo={todo}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default KanbanColumn;
