import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { keys } from './keys';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Helmet Setup
  app.use(helmet());

  // Microservice, NATS Setup
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: keys.NATS_URL + keys.NATS_PORT
    }
  });

  microservice.listen(() => {});

  // Swagger Setup
  const options = new DocumentBuilder()
    .setTitle('Sample Microservice')
    .setDescription('sample setup')
    .setVersion('1.0')
    .addTag('sample-setup')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // validation Setup
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, () =>
    console.log('Sample-Setup is up and running...')
  );
}
bootstrap();
