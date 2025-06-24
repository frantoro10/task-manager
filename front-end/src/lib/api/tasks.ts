"use client";

import { Task } from "@/types/task";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/tasks	";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE_URL}/api/tasks`);
  if (!res.ok) throw new Error("Error al obtener las tareas");
  return res.json();
}

export async function createTask(data: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear la tarea");
  return res.json();
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar la tarea");
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar la tarea");
}
