import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    @Inject('REQUEST') private req: any,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    createTaskDto.user_id = this.req.user.id;
    return await this.prisma.tasks.create({ data: createTaskDto });
  }

  async findAll() {
    return await this.prisma.tasks.findMany({
      where: { user_id: this.req.user.id },
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        user_id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.tasks.findUnique({
        where: { id, user_id: this.req.user.id },
      });
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
        where: { id, user_id: this.req.user.id },
        data: updateTaskDto,
      });
    } catch (error) {
      throw new NotFoundException(`Task ID not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.tasks.delete({
        where: { id, user_id: this.req.user.id },
      });
    } catch (error) {
      throw new NotFoundException(`Task ID not found`);
    }
  }
}
