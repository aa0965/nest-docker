import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  Client,
  Transport,
  ClientProxy
} from '@nestjs/microservices';
import { BodyDTO } from './app.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('NATS') private client: ClientProxy
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

  @Post()
  async sayHi(@Body() body: BodyDTO) {
    return body;
  }

  @Post('/hi')
  async sayHello(@Body() body) {
    return 'Hi ' + body.name;
  }

  // @MessagePattern('hello')
  // sayhello(payload: any) {
  //   console.log('NATS: ', payload);
  // }
}
