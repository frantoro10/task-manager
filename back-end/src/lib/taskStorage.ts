import { promises as fs } from "fs";
import path from "path";
import { Task } from "../types";

const dataPath = path.join(__dirname, "..", "data", "tasks.json");

export async function readTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo tareas:", error);
    return [];
  }
}

export async function writeTasks(tasks: Task[]): Promise<void> {
  try {
    await fs.writeFile(dataPath, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (error) {
    console.error("Error escribiendo tareas:", error);
  }
}
