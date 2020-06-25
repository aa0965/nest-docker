import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { keys } from './keys';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: keys.NATS_URL + keys.NATS_PORT,
    },
  });

  // app.startAllMicroservices();
  microservice.listen(() => {});

  await app.listen(3000, () => console.log('PT is up and running'));
}
bootstrap();
