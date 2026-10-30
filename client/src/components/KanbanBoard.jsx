import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import KanbanItem from './KanbanItem';

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

function KanbanBoard({ todos, onUpdateStatus, onEdit, onDelete }) {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const activeTodo = activeId ? todos.find(t => t._id === activeId) : null;

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const todoId = active.id;
    const newStatus = over.id;

    // Check if dropped on a column
    if (['todo', 'inprogress', 'done'].includes(newStatus)) {
      const todo = todos.find(t => t._id === todoId);
      if (todo && todo.status !== newStatus) {
        onUpdateStatus(todoId, newStatus);
      }
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    // If dragging over another item, find which column it's in
    const overTodo = todos.find(t => t._id === over.id);
    if (overTodo) {
      const todo = todos.find(t => t._id === active.id);
      if (todo && todo.status !== overTodo.status) {
        onUpdateStatus(active.id, overTodo.status);
      }
    }
  };

  const getColumnTodos = (columnId) => {
    return todos.filter(todo => (todo.status || 'todo') === columnId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map(column => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            todos={getColumnTodos(column.id)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTodo ? (
          <div className="opacity-80">
            <KanbanItem todo={activeTodo} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;
