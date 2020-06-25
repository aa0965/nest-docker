import { Controller, Inject, UseGuards } from '@nestjs/common';
import {
  Payload,
  Transport,
  ClientProxy,
  EventPattern
} from '@nestjs/microservices';

import { config } from '../config';

import { PipelinesService } from '../services/pipelines.service';
import { MQTT_CLIENT } from '../constants';
import { CommandManagerService } from '../services/command-manager.service';
import { IMqttCommandPacket } from '../types.dto';
import { HandshakeGuard } from '../guards/handshake.guard';

@Controller('titan')
@UseGuards(HandshakeGuard)
export class TitanController {
  //////////////////////////
  // Recieve Data from Titan
  //////////////////////////

  // Added a random line///////////

  // Recieve MQTT data packet from titan and send it to pipeline for processing
  @EventPattern(config.siteMqttTopic + '/data/#', Transport.MQTT)
  handleData(@Payload() message: any) {
    console.log(message);
    this._pipelinesService.processDataPacket(message);
  }

  // Recieve MQTT status packet from titan and send it to pipeline for processing
  @EventPattern(config.siteMqttTopic + '/status/#', Transport.MQTT)
  handleStatus(@Payload() message: any) {
    // console.log(message);
    this._pipelinesService.processStatusPacket(message);
  }

  @EventPattern(config.siteMqttTopic + '/ack/', Transport.MQTT)
  handleAcknowledgement(@Payload() message: any) {
    console.log('ack', message);
    this._commandService.handleAcknowledgement(message);
  }

  /////////////////////
  // Send Data to Titan
  /////////////////////

  constructor(
    private _pipelinesService: PipelinesService,
    private _commandService: CommandManagerService,
    @Inject(MQTT_CLIENT) private _mqtt: ClientProxy
  ) {
    this._commandService.$commandQueue.subscribe(this._sendCommandToTitan);
  }

  private _sendCommandToTitan(packet: IMqttCommandPacket) {
    console.log('sent command');
    // this._mqtt.emit(`${config.siteMqttTopic}/${packet.location}/cmd`, packet.payload);
  }
}
