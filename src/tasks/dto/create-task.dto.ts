import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
