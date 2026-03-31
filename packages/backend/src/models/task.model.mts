import mongodb from "../db/index.mts";
import type { Task } from "../../../shared/js/types.ts";

const tasksCollection = () => mongodb.getDb().collection<Task>("tasks");

export async function getAllTasks() {
  return tasksCollection().find().toArray();
}

export async function getTaskById(id: string) {
  return tasksCollection().findOne({ _id: id });
}

export async function createTask(task: Task) {
  return tasksCollection().insertOne(task);
}

export async function updateTask(id: string, update: Partial<Task>) {
  return tasksCollection().updateOne({ _id: id }, { $set: update });
}

export async function completeTask(id: string) {
  return tasksCollection().updateOne(
    { _id: id },
    {
      $set: {
        status: "complete",
        completedAt: new Date(),
        updatedAt: new Date(),
      },
    },
  );
}

export async function deleteTask(id: string) {
  return tasksCollection().deleteOne({ _id: id });
}
