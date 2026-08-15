import { TaskRequest, TaskResponse, createTaskRequestMock } from '@rebeca-hexagonal-nest-template/api-contract';

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateTaskCommand } from '../application/commands/create-task.command';
import { UpdateTaskCommand } from '../application/commands/update-task.command';
import { CreateTaskUseCase } from '../application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '../application/use-cases/delete-task.use-case';
import { GetTaskUseCase } from '../application/use-cases/get-task.use-case';
import { GetTasksUseCase } from '../application/use-cases/get-tasks.use-case';
import { UpdateTaskUseCase } from '../application/use-cases/update-task.use-case';
import { TaskMapper } from './mappers/task.mapper';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  public constructor(
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  @Get()
  public async getTasks(): Promise<TaskResponse[]> {
    const tasks = await this.getTasksUseCase.execute();
    return tasks.map((task) => TaskMapper.toResponse(task));
  }

  @Get(':id')
  public async getTask(@Param('id', ParseIntPipe) id: number): Promise<TaskResponse> {
    const task = await this.getTaskUseCase.execute(id);
    return TaskMapper.toResponse(task);
  }

  @Post()
  @ApiBody({ description: '', examples: { example: { value: createTaskRequestMock() } } })
  public async createTask(@Body() request: TaskRequest): Promise<TaskResponse> {
    const task = await this.createTaskUseCase.execute(new CreateTaskCommand(request.title, request.description));
    return TaskMapper.toResponse(task);
  }

  @Put(':id')
  @ApiBody({ description: '', examples: { example: { value: createTaskRequestMock() } } })
  public async updateTask(@Param('id', ParseIntPipe) id: number, @Body() request: TaskRequest): Promise<TaskResponse> {
    const task = await this.updateTaskUseCase.execute(new UpdateTaskCommand(id, request.title, request.description));
    return TaskMapper.toResponse(task);
  }

  @Delete(':id')
  public async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteTaskUseCase.execute(id);
  }
}
