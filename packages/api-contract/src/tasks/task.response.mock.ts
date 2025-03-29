import { TaskResponse } from './task.response';

export const taskResponseMock = (customValues: Partial<TaskResponse> = {}): Readonly<TaskResponse> => ({
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  ...customValues
});
