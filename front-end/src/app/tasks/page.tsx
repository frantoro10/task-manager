"use client";
import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/api/tasks";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";

// Función para normalizar fechas de manera consistente
const normalizeDate = (dateString: string | Date): Date => {
  if (dateString instanceof Date) {
    return dateString;
  }
  return new Date(dateString);
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar tareas - Load tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
  
        // Convertir fechas si vienen como strings
        const parsedTasks = fetchedTasks.map((task) => ({
          ...task,
          createdAt: normalizeDate(task.createdAt),
          updatedAt: task.updatedAt ? normalizeDate(task.updatedAt) : undefined,
        }));
  
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error al cargar tareas desde la API:", error);
        alert("Hubo un error al cargar las tareas desde el servidor.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTasks();
  }, []);


  const handleAddTask = async (newTaskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    try {
      const createdTask = await createTask(newTaskData); // La respuesta del back ya incluye id y fechas
      // Normalizar las fechas de la tarea creada
      const normalizedTask = {
        ...createdTask,
        createdAt: normalizeDate(createdTask.createdAt),
        updatedAt: createdTask.updatedAt ? normalizeDate(createdTask.updatedAt) : undefined,
      };
      setTasks((prev) => [normalizedTask, ...prev]); // Insertamos la nueva tarea al estado
      setShowForm(false);
      
      setTimeout(() => {
        setShowForm(true);
      }, 100);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert("Hubo un error al crear la tarea.");
    }
  };

  const handleEditTask = (id: string) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setShowForm(true);
    }
  };

  const handleUpdateTask = async (
    updatedTaskData: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!editingTask) return;
  
    try {
      const updated = await updateTask(editingTask.id, updatedTaskData);
  
      // Normalizar fechas si vienen como string
      const updatedNormalized = {
        ...updated,
        createdAt: normalizeDate(updated.createdAt),
        updatedAt: updated.updatedAt ? normalizeDate(updated.updatedAt) : undefined,
      };
  
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? updatedNormalized : task
        )
      );
  
      setEditingTask(null);
      setShowForm(false);
  
      // feedback visual
      setTimeout(() => {
        setShowForm(true);
      }, 100);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert("Hubo un error al actualizar la tarea.");
    }
  };



    const handleDeleteTask = async (id: string) => {
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta tarea?");
    if (!confirmDelete) return;

    try {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        alert("Hubo un error al eliminar la tarea.");
    }
    };


    const handleToggleComplete = async (id: string) => {
      const taskToToggle = tasks.find(task => task.id === id);
      if (!taskToToggle) return;
    
      try {
        const updated = await updateTask(id, {
          title: taskToToggle.title,
          description: taskToToggle.description,
          completed: !taskToToggle.completed,
        });
    
        // Normalizar fechas si vienen como string
        const updatedNormalized = {
          ...updated,
          createdAt: new Date(updated.createdAt),
          updatedAt: updated.updatedAt ? new Date(updated.updatedAt) : undefined,
        };
    
        setTasks(prev =>
          prev.map(task => task.id === id ? updatedNormalized : task)
        );
      } catch (error) {
        console.error("Error al cambiar estado de tarea:", error);
        alert("No se pudo cambiar el estado de la tarea.");
      }
    };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Lista de Tareas</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Total: {totalCount}</span>
          <span>Completadas: {completedCount}</span>
          <span>Pendientes: {totalCount - completedCount}</span>
        </div>
      </div>

      {/* Formulario */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            {editingTask ? "Editar Tarea" : "Nueva Tarea"}
          </h2>
          {!showForm && !editingTask && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              + Nueva Tarea
            </button>
          )}
        </div>
        
        {showForm && (
          <TaskForm
            initialData={editingTask || undefined}
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={editingTask ? handleCancelEdit : undefined}
            submitLabel={editingTask ? "Actualizar Tarea" : "Crear Tarea"}
          />
        )}
      </div>

      {/* Lista de tareas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Mis Tareas</h2>
          {tasks.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => setTasks([])}
                className="text-red-600 hover:text-red-800 text-sm hover:underline"
              >
                Limpiar todas
              </button>
            </div>
          )}
        </div>
        
        <TaskList 
          tasks={tasks} 
          onEdit={handleEditTask} 
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </div>

      {/* Footer con estadísticas */}
      {tasks.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>
              Progreso: {completedCount} de {totalCount} tareas completadas
              {totalCount > 0 && (
                <span className="ml-2">
                  ({Math.round((completedCount / totalCount) * 100)}%)
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </main>
  );
} 