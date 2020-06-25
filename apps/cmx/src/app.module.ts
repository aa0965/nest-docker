import { Module } from '@nestjs/common';
import { deviceController } from './app.controller';
import { deviceService } from './app.service';
import { deviceProviders } from './app.providers';
import { DatabaseModule } from './database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { keys } from './keys';


@Module({
  imports: [DatabaseModule,
      ClientsModule.register([
        {
          name: 'CMX',
          transport: Transport.NATS,
          options: { url: keys.NATS_URL + keys.NATS_PORT },
        },
    ]),
  ],
  controllers: [deviceController],
  providers: [
    deviceService,
    ...deviceProviders,
  ],
})
export class deviceModule {}