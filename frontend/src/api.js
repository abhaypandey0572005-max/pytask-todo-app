/**
 * API Service for interacting with the Python Flask Backend
 */

const BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';
const API_BASE = `${BASE_URL}/tasks`;

export async function fetchTasks() {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  return await response.json();
}

export async function addTask(payload) {
  const bodyData = typeof payload === 'string' ? { task: payload } : payload;

  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to add task');
  }

  return await response.json();
}

export async function completeTask(index) {
  const response = await fetch(`${API_BASE}/${index}/complete`, {
    method: 'PUT',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to complete task');
  }

  return await response.json();
}

export async function editTask(index, payload) {
  const bodyData = typeof payload === 'string' ? { task: payload } : payload;

  const response = await fetch(`${API_BASE}/${index}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update task');
  }

  return await response.json();
}

export async function deleteTask(index) {
  const response = await fetch(`${API_BASE}/${index}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to delete task');
  }

  return await response.json();
}
