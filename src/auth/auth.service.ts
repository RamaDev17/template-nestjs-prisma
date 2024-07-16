import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/register-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(data: RegisterDto) {
    const checkUserExist = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (checkUserExist) {
      throw new HttpException('User already exist', HttpStatus.FOUND);
    }

    data.password = await bcrypt.hash(data.password, 12);

    const createUser = await this.prisma.users.create({
      data: data,
    });

    if (createUser) {
      return {
        statusCode: 201,
        message: 'User created successfully',
      };
    }
  }

  async login(data: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new HttpException('Login failed', 400);
    }

    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) {
      throw new HttpException('Login failed', 400);
    }

    return {
      statusCode: 200,
      message: 'Login successfully',
    };
  }
}
