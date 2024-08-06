import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UpdateProfileDto } from './dto/register-dto';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    return await this.authService.profile(req.user.id);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        address: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Put('update-profile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/uploads/profiles',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedFileTypes = /png|jpg|jpeg/;
        const ext = extname(file.originalname).toLowerCase();
        if (!allowedFileTypes.test(ext)) {
          return cb(new BadRequestException('Invalid file type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async updateProfile(
    @Req() req,
    @Body() data: UpdateProfileDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const size = req.headers['content-length'] / 1024 / 1024;
    if (size > 2) {
      throw new BadRequestException('File size is too large, max 2mb');
    }

    return await this.authService.updateProfile(req.user.id, data, file);
  }
}
