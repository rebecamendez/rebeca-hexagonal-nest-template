import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RootService {
  public constructor(private readonly configService: ConfigService) {}

  public getHello(): unknown {
    const build_version = this.configService.get<string>('VERSION') || 'fake-version';
    const build_sha = this.configService.get<string>('BUILD_IMAGE_SHA') || 'fake-sha';
    const build_date = this.configService.get<string>('BUILD_IMAGE_DATE') || 'fake-date';
    const environment = this.configService.get<string>('ENVIRONMENT');

    return {
      message: `Hello World from: @kanbify/api (v.${build_version})`,
      metadata: { build_version, build_sha, build_date, environment }
    };
  }
}
