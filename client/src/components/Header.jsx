import { useState, useEffect } from 'react';
import { Sun, Moon, ListTodo, KanbanSquare } from 'lucide-react';

function Header({ view, onViewChange }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  function toggleTheme() {
    setIsDark(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newValue;
    });
  }

  const isKanban = view === 'kanban';

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isKanban ? (
            <KanbanSquare className="h-6 w-6 text-primary" />
          ) : (
            <ListTodo className="h-6 w-6 text-primary" />
          )}
          <span className="font-bold text-xl text-primary">
            {isKanban ? 'Task Board' : 'Task List'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewChange(isKanban ? 'list' : 'kanban')}
            className="p-2 rounded-full bg-secondary text-secondary-foreground transition-colors border border-secondary hover:border-primary"
            aria-label={isKanban ? 'Switch to List View' : 'Switch to Kanban View'}
            title={isKanban ? 'Switch to List View' : 'Switch to Kanban View'}
          >
            {isKanban ? (
              <ListTodo className="h-5 w-5" />
            ) : (
              <KanbanSquare className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary text-secondary-foreground transition-colors border border-secondary hover:border-primary"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
