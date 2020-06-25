import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { SampleDTO } from './app.controller.dto';

// Write only routes, NATS message handling logic in controlers
// Use only services for any other code

// Annotate all variables using typescript (e.g. const sample: string = 'hello')
// Define all types as classes in a separate file with .dto.ts extension

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sampleRequest(): string {
    return this.appService.getHello();
  }

  @Post()
  samplePost(@Body() body: SampleDTO) {
    return this.appService.getHello(body.name);
  }
}
