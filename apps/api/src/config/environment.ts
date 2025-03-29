import { Expose, Transform, plainToClass } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, ValidationError, validateSync } from 'class-validator';

import { Logger } from '@nestjs/common';

export class Environment {
  @Expose()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  public readonly PORT: number = 3000;

  @Expose()
  @IsOptional()
  @IsString()
  public readonly DB_HOST: string = 'localhost';

  @Expose()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  public readonly DB_PORT: number = 5432;

  @Expose()
  @IsOptional()
  @IsString()
  public readonly DB_USER: string = 'rebeca-hexagonal-nest-template';

  @Expose()
  @IsOptional()
  @IsString()
  public readonly DB_PASSWORD: string = 'rebeca-hexagonal-nest-template';

  @Expose()
  @IsOptional()
  @IsString()
  public readonly DB_DATABASE: string = 'rebeca-hexagonal-nest-template';

  @Expose()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  public readonly DB_ENABLE_LOG: boolean = false;

  @Expose()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  public readonly ENABLE_OPENAPI: boolean = false;

  @IsIn(['LOCAL', 'PROD'])
  public readonly ENVIRONMENT: 'LOCAL' | 'PROD' = 'LOCAL';

  // -- Static Methods --
  public static validate(config: Record<string, unknown>): Environment {
    const validatedConfig = plainToClass(Environment, config, {
      enableImplicitConversion: false,
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
      exposeUnsetFields: false
    });

    const errors = validateSync(validatedConfig, { skipMissingProperties: false, whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
      this.formatValidationErrors(errors);
      throw new Error('Environment validation failed');
    }

    Logger.log('[environment] ✅ Variables validated successfully');
    return validatedConfig;
  }

  // -- Private Methods --
  private static formatValidationErrors(errors: ValidationError[]): void {
    Logger.error('[environment] ❌ Error validating environment variables:');
    errors.forEach((error) => {
      Logger.error(`   - ${error.property}: ${Object.values(error.constraints || {}).join(', ')}`);
    });
  }
}
