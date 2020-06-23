import { Controller, Inject } from '@nestjs/common';
import { MainService } from './main.service';
import { MessagePattern, ClientProxy, Payload } from '@nestjs/microservices';
import { config } from './config';
import { jsonDataPacket } from 'bl/packet-types';
import { NATS_CLIENT } from './constants';

@Controller()
export class AppController {
  constructor(
    private _mainService: MainService,
    @Inject(NATS_CLIENT) private _nats: ClientProxy
  ) {
    this._mainService.$miloPipeline.subscribe(this._sendNatsMessage);
    this._mainService.$minionPipeline.subscribe(this._sendNatsMessage);
    this._mainService.$branchPipeline.subscribe(this._sendNatsMessage);
  }

  @MessagePattern(config.siteMqttTopic + '/data/#')
  handleData(@Payload() data: any) {
    this._mainService.processDataPacket(data);
  }

  private _sendNatsMessage = (packet: jsonDataPacket) => {
    const subject = `data/${packet.client}/${packet.site}/${packet.deviceType}/${packet.identifier}`;
    this._nats.emit(subject, packet);
  };
}
