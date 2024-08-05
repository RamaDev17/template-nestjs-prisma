import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const data = await this.tasksService.create(createTaskDto);

    return {
      message: 'Task created successfully',
      data,
      statusCode: 201,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const data = await this.tasksService.findAll();

    return {
      message: 'Get all tasks successfully',
      data,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.tasksService.findOne(+id);

    return {
      message: 'Get details task successfully',
      data,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const data = await this.tasksService.update(+id, updateTaskDto);

    return {
      message: 'Task updated successfully',
      data,
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.tasksService.remove(+id);

    return {
      message: 'Task deleted successfully',
      data,
      statusCode: 200,
    };
  }
}
