import { Task } from './task';

export const createTaskMock = (customValues: Partial<Task> = {}): Readonly<Task> => ({
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  ...customValues
});
