import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  Client,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('NATS') private client: ClientProxy,
  ) {
    setTimeout(() => {
      this.client.emit('hello', 'hello 1');
      this.client.emit('hello', 'hello 2');
      this.client.emit('hello', 'hello 3');
      this.client.emit('hello', 'hello 4');
      this.client.emit('hello', 'hello 5');
    }, 3000);
  }

  @Get()
  async getHello() {
    const hello = this.appService.getHello();

    this.client.emit('hello', hello);
    return hello;
  }

  // @MessagePattern('hello')
  // sayhello(payload: any) {
  //   console.log('NATS: ', payload);
  // }
}
