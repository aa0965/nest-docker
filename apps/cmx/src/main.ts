import { NestFactory } from '@nestjs/core';
import { deviceModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { keys } from './keys';


async function bootstrap() {
  const app = await NestFactory.create(deviceModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: keys.NATS_URL + keys.NATS_PORT,
      queue: 'cmx-queue',
    },
  });

  app.startAllMicroservices();

  await app.listen(3003, () => console.log('CMX is up and running...'));
}
bootstrap();