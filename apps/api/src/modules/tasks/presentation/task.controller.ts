import { TaskRequest, TaskResponse, createTaskRequestMock } from '@rebeca-hexagonal-nest-template/api-contract';

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { TaskService } from '../application/task.service';
import { TaskMapper } from './mappers/task.mapper';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  @Get()
  public async getTasks(): Promise<TaskResponse[]> {
    const tasks = await this.taskService.getTasks();
    return tasks.map((task) => TaskMapper.toResponse(task));
  }

  @Get(':id')
  public async getTask(@Param('id', ParseIntPipe) id: number): Promise<TaskResponse> {
    const task = await this.taskService.getTask(id);
    return TaskMapper.toResponse(task);
  }

  @Post()
  @ApiBody({ description: '', examples: { example: { value: createTaskRequestMock() } } })
  public async createTask(@Body() request: TaskRequest): Promise<TaskResponse> {
    const task = await this.taskService.createTask(request.title, request.description);
    return TaskMapper.toResponse(task);
  }

  @Put(':id')
  @ApiBody({ description: '', examples: { example: { value: createTaskRequestMock() } } })
  public async updateTask(@Param('id', ParseIntPipe) id: number, @Body() request: TaskRequest): Promise<TaskResponse> {
    const task = await this.taskService.updateTask(id, request.title, request.description);
    return TaskMapper.toResponse(task);
  }

  @Delete(':id')
  public async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.taskService.deleteTask(id);
  }
}
