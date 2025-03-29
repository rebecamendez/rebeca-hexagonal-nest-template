import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RootService } from './root.service';

@ApiTags('root')
@Controller()
export class RootController {
  public constructor(private readonly appService: RootService) {}

  @Get()
  public getHello(): unknown {
    return this.appService.getHello();
  }
}
