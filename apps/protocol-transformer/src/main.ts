import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';

import { keys } from './keys';
import { config } from './config';

import { AppModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Helmet Setup
  app.use(helmet());

  // NATS Setup
  const nats_microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: keys.NATS_URL + keys.NATS_PORT
    }
  });

  nats_microservice.listen(() => {});

  // MQTT Setup
  const mqtt_microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: config.mqttUrl
    }
  });

  mqtt_microservice.listen(() => {});

  // Swagger Setup
  const options = new DocumentBuilder()
    .setTitle('Protocol Transformer')
    .setDescription('handles getting and parsing data packets from titan')
    .setVersion('1.0')
    .addTag('pt')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // validation Setup
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, () => console.log('PT is up and running...'));
}
bootstrap();
