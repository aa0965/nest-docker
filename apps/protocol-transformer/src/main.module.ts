import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { keys } from './keys';
import { NATS_CLIENT, MQTT_CLIENT } from './constants';

import { DataPacketService } from './services/data-packet.service';
import { PipelinesService } from './services/pipelines.service';

import { TitanController } from './controllers/titan.controller';
import { CloudController } from './controllers/cloud.controller';
import { config } from './config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_CLIENT,
        transport: Transport.NATS,
        options: { url: keys.NATS_URL + keys.NATS_PORT }
      },
      {
        name: MQTT_CLIENT,
        transport: Transport.MQTT,
        options: { url: config.mqttUrl }
      }
    ])
  ],
  controllers: [TitanController, CloudController],
  providers: [PipelinesService, DataPacketService]
})
export class AppModule {}
