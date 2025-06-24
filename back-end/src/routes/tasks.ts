import { Router, Request, Response } from "express";
import { readTasks, writeTasks } from "../lib/taskStorage";
import { Task } from "../types";

const router = Router();

// 🔹 GET /api/tasks
router.get("/", async (req: Request, res: Response) => {
  const tasks = await readTasks();
  res.json(tasks);
});

// 🔹 POST /api/tasks
router.post("/", async (req: Request, res: Response) => {
  const { title, description, completed = false } = req.body;
  if (!title) return res.status(400).json({ error: "Falta el título" });

  const newTask: Task = {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description?.trim(),
    completed,
    createdAt: new Date().toISOString(),
  };

  const tasks = await readTasks();
  const updatedTasks = [newTask, ...tasks];
  await writeTasks(updatedTasks);

  res.status(201).json(newTask);
});

// 🔹 PUT /api/tasks/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const tasks = await readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Tarea no encontrada" });

  const updatedTask: Task = {
    ...tasks[index],
    title,
    description,
    completed,
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updatedTask;
  await writeTasks(tasks);

  res.json(updatedTask);
});

// 🔹 DELETE /api/tasks/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const filtered = tasks.filter((t) => t.id !== id);

  if (filtered.length === tasks.length) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  await writeTasks(filtered);
  res.status(204).send();
});

export default router;
