import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Transport,
  Payload
} from '@nestjs/microservices';

import { NATS_CLIENT } from '../constants';

import { jsonDataPacket } from 'bl/packet-types';

import { PipelinesService } from '../services/pipelines.service';

@Controller('cloud')
export class CloudController {
  //////////////////////////
  // Recieve Data from Cloud
  //////////////////////////

  @MessagePattern('cmd', Transport.NATS)
  handleCommand(@Payload() packet: any) {
    // send command packet to titan
  }

  /////////////////////
  // Send Data to Cloud
  /////////////////////

  constructor(
    private _pipelinesService: PipelinesService,
    @Inject(NATS_CLIENT) private _nats: ClientProxy
  ) {
    // this pipeline has all data packets parsed in the correct format
    this._pipelinesService.$dataPacketPipeline.subscribe(
      this._sendNatsDataMessage
    );
    // this pipeline has all status packets parsed in the correct format
    this._pipelinesService.$parsedStatusPipeline.subscribe(
      this._sendNatsStatusMessage
    );
  }

  // Send data packets via NATS to DCX, EPTS
  private _sendNatsDataMessage = (packet: jsonDataPacket) => {
    // console.log(packet);
    const subject = `data/${packet.client}/${packet.site}/${packet.deviceType}/${packet.identifier}`;
    this._nats.emit(subject, packet);
  };

  // Send data packets via NATS to EPMX
  private _sendNatsStatusMessage = (packet: any) => {
    const subject = 'status';
    this._nats.emit(subject, packet);
  };
}
