"use client";

import { Task } from "@/types/task";
import { useState, FormEvent } from "react";

interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export default function TaskForm({ 
  initialData = {}, 
  onSubmit, 
  onCancel,
  submitLabel = "Guardar tarea"
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [completed, setCompleted] = useState(initialData.completed || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = "El título es obligatorio";
    } else if (title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    }
    
    if (description.trim().length > 500) {
      newErrors.description = "La descripción no puede exceder 500 caracteres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({ 
        title: title.trim(), 
        description: description.trim(), 
        completed 
      });
      
      // Reset form only if not editing
      if (!initialData.id) {
        setTitle("");
        setDescription("");
        setCompleted(false);
      }
      setErrors({});
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Reset form if no cancel handler provided
      setTitle("");
      setDescription("");
      setCompleted(false);
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium text-gray-700 mb-2">
          Título *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
          }}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: Comprar leche"
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
          }}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: Comprar leche deslactosada en el supermercado"
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
          <p className="text-gray-400 text-sm ml-auto">
            {description.length}/500
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="completed"
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          disabled={isSubmitting}
        />
        <label htmlFor="completed" className="text-sm font-medium text-gray-700">
          ¿Completada?
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Guardando...
            </span>
          ) : (
            submitLabel
          )}
        </button>
        
        {(onCancel || !initialData.id) && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
