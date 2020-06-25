import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  Client,
  Transport,
  ClientProxy,
  EventPattern,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('NATS') private client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    const hello = this.appService.getHello();

    this.client.emit('hello', hello);
    return hello;
  }

  @EventPattern('hell')
  async handleUserCreated(data) {
    console.log(data)
  }
}
