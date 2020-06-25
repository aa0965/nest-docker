import { Controller, Inject } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Transport,
  ClientProxy
} from '@nestjs/microservices';

import { config } from '../config';

import { PipelinesService } from '../services/pipelines.service';
import { MQTT_CLIENT } from '../constants';

@Controller('titan')
export class TitanController {
  constructor(
    private _pipelinesService: PipelinesService,
    @Inject(MQTT_CLIENT) private _mqtt: ClientProxy
  ) {}

  //////////////////////////
  // Recieve Data from Titan
  //////////////////////////

  // Added a random line///////////
  
  // Recieve MQTT data packet from titan and send it to pipeline for processing
  @MessagePattern(config.siteMqttTopic + '/data/#', Transport.MQTT)
  handleData(@Payload() message: any) {
    this._pipelinesService.processDataPacket(message);
  }

  // Recieve MQTT status packet from titan and send it to pipeline for processing
  @MessagePattern(config.siteMqttTopic + '/status/#', Transport.MQTT)
  handleStatus(@Payload() message: any) {
    // console.log(message);
    this._pipelinesService.processStatusPacket(message);
  }

  @MessagePattern(config.siteMqttTopic + '/ack/', Transport.MQTT)
  handleAcknowledgement(@Payload() message: any) {}

  /////////////////////
  // Send Data to Titan
  /////////////////////
}
