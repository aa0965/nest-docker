import { Injectable, Inject } from '@nestjs/common';

import { jsonDataPacket } from 'bl/packet-types';
import { config } from '../config';
import { MQTTDataPacket } from 'bl/devices-types';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DataPacketService {
  constructor(@Inject('NATS') private _nats: ClientProxy) {}

  private _authenticateAndGetIdentifier = async (
    deviceId: string,
    equipmentId?: number
  ): Promise<string | false> => {
    const identifier = 'A/L2';

    // call CMX and verify packet
    // also get block, floor info (using deviceId+equipmentId if given, otherwise using deviceId)

    // construct identifier from block, floor info and return it
    // if unauthentic packet, return false
    return identifier;
  };

  public createDataPacket = async (
    mqttPacket: MQTTDataPacket
  ): Promise<jsonDataPacket | null> => {
    const data: any = {};
    // parse data from index 4 to 2nd last index of packet
    for (let i = 4; i < mqttPacket.values.length - 2; i++) {
      data[mqttPacket.values[i].key] = mqttPacket.values[i].value;
    }

    // ahu devices will have equipmentId present in the data object, in other packets, pass equipmentId as undefined
    const identifier = await this._authenticateAndGetIdentifier(
      mqttPacket.values[1].value,
      data.equipmentId || undefined
    );

    if (!identifier) return null;

    const packet: jsonDataPacket = {
      client: config.client,
      site: config.site,
      deviceType: mqttPacket.values[0].value,
      deviceId: mqttPacket.values[1].value,
      rssi: +mqttPacket.values[2].value,
      counter: +mqttPacket.values[3].value,
      timestamp: Date.now(),
      data,
      identifier
    };

    return packet;
  };
}
