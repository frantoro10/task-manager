"use client";

import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

// Función para formatear fechas de manera consistente
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
};

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }: TaskItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-3 flex-1">
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed 
              ? "bg-green-500 border-green-500 text-white" 
              : "border-gray-300 hover:border-green-400"
          }`}
          aria-label={task.completed ? "Marcar como incompleta" : "Marcar como completa"}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-1">
          <h3 
            className={`text-lg font-semibold transition-all ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          <p className={`text-sm transition-all ${
            task.completed ? "text-gray-400" : "text-gray-600"
          }`}>
            {task.description}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Creada: {formatDate(task.createdAt)}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 ml-4">
        <button
          type="button"
          onClick={() => onEdit(task.id)}
          className="px-3 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
          aria-label="Editar tarea"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
          aria-label="Eliminar tarea"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
} 