const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Something went wrong');
  }

  return data;
}

export async function getTodos() {
  const response = await fetch(`${API_BASE}/todos`);
  return handleResponse(response);
}

export async function createTodo(todo) {
  const response = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return handleResponse(response);
}

export async function updateTodo(id, todo) {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return handleResponse(response);
}

export async function toggleTodoDone(id) {
  const response = await fetch(`${API_BASE}/todos/${id}/done`, {
    method: 'PATCH',
  });
  return handleResponse(response);
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

export async function updateTodoStatus(id, status) {
  const response = await fetch(`${API_BASE}/todos/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
}
