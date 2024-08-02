import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto, UpdateProfileDto } from './dto/register-dto';
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

  async updateProfile(userId: number, data: UpdateProfileDto, file) {
    if (!file && !data) {
      throw new HttpException('No data to update', 400);
    }

    const user = await this.prisma.users.findFirst({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('Profile not found', 404);
    }

    if (file) {
      data.avatar = file.filename;
    }

    const updateUser = await this.prisma.users.update({
      where: { id: userId },
      data: data,
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
    return {
      message: 'Profile updated successfully',
      statusCode: 200,
      data: updateUser,
    };
  }
}
