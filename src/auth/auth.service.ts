import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/register-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
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

    const payload = { sub: user.id, email: user.email };
    return {
      statusCode: 200,
      token: await this.jwt.signAsync(payload),
      message: 'Login successfully',
    };
  }

  async profile(userId: number) {
    const user = await this.prisma.users.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        avatar: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new HttpException('Profile not found', 404);
    }

    return {
      message: 'Get profile successfully',
      statusCode: 200,
      data: user,
    };
  }
}
