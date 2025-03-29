import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TaskRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public readonly title!: string;

  @IsString()
  @IsNotEmpty()
  public readonly description!: string;
}
