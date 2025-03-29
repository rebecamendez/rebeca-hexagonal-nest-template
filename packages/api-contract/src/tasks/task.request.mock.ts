import { TaskRequest } from './task.request';

export const createTaskRequestMock = (customValues: Partial<TaskRequest> = {}): Readonly<TaskRequest> => ({
  title: 'Test Task',
  description: 'Test Description',
  ...customValues
});
