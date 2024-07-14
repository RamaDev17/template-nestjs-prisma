import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    return await this.prisma.tasks.create({ data: createTaskDto });
  }

  async findAll() {
    return await this.prisma.tasks.findMany();
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.tasks.findUnique({ where: { id } });
      if (!data) {
        throw new NotFoundException(`Task ID not found`);
      }

      return data;
    } catch (error) {
      throw new NotFoundException(`Task ID not found`);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prisma.tasks.update({
        where: { id },
        data: updateTaskDto,
      });
    } catch (error) {
      throw new NotFoundException(`Task ID not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.tasks.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Task ID not found`);
    }
  }
}
