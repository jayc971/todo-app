import TodoItem from './TodoItem';

function TodoList({ todos, onToggleDone, onEdit, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-muted-foreground text-center py-4">
          No tasks yet. Add one above!
        </p>
      </div>
    );
  }

  // Sort: incomplete tasks first, then completed
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.done && !b.done) return 1;
    if (!a.done && b.done) return -1;
    return 0;
  });

  return (
    <div className="mt-6">
      <ul className="space-y-3">
        {sortedTodos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggleDone={onToggleDone}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
