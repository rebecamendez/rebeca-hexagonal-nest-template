import { Task } from '../../domain/task';

export interface TaskRepository {
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task>;
  createTask(title: string, description: string): Promise<Task>;
  updateTask(id: number, title: string, description: string): Promise<Task>;
  deleteTask(id: number): Promise<void>;
}
