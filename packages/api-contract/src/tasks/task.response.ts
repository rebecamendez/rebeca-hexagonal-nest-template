import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TaskResponse {
  @IsInt()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public title!: string;

  @IsString()
  @IsNotEmpty()
  public description!: string;
}
