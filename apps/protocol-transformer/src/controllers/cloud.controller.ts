import { Controller, Inject, UseGuards } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Transport,
  Payload
} from '@nestjs/microservices';

import { NATS_CLIENT } from '../constants';

import {
  jsonDataPacket,
  statusPacket,
  commandPacket
} from '../shared/packetTypes.dto';

import { PipelinesService } from '../services/pipelines.service';
import { config } from '../config';
import { CommandManagerService } from '../services/command-manager.service';
import { HandshakeGuard } from '../guards/handshake.guard';
import { PTHandshakeService } from '../services/pt-handshake.service';

@Controller('cloud')
@UseGuards(HandshakeGuard)
export class CloudController {
  //////////////////////////
  // Recieve Data from Cloud
  //////////////////////////

  @MessagePattern(`command/${config.client}/${config.site}`, Transport.NATS)
  handleCommand(@Payload() packet: commandPacket) {
    // send command packet to titan
    // returns an observable back that tells about the ack status
    return this._commandService.sendCommand(packet as any);
  }

  /////////////////////
  // Send Data to Cloud
  /////////////////////

  constructor(
    private _pipelinesService: PipelinesService,
    private _commandService: CommandManagerService,
    private _handshakeService: PTHandshakeService,
    @Inject(NATS_CLIENT) private _nats: ClientProxy
  ) {
    // perform handshake with PT Interface
    this._handshakeService.performHandshake();

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
  private _sendNatsStatusMessage = (packet: statusPacket) => {
    // console.log(packet);
    const subject = 'status';
    this._nats.emit(subject, packet);
  };
}
