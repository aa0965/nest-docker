import { Module } from '@nestjs/common';
import { AppController } from './main.controller';
import { MainService } from './main.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { keys } from './keys';
import { DataPacketService } from './data-packet/data-packet.service';
import { NATS_CLIENT } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_CLIENT,
        transport: Transport.NATS,
        options: { url: keys.NATS_URL + keys.NATS_PORT }
      }
    ])
  ],
  controllers: [AppController],
  providers: [MainService, DataPacketService]
})
export class AppModule {}
