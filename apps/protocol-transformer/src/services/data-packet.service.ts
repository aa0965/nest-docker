import { Injectable } from '@nestjs/common';

import { jsonDataPacket } from 'bl/packet-types';
import { MQTTDataPacket } from '../types.dto';

import { config } from '../config';
import { CMXService } from './cmx.service';

@Injectable()
export class DataPacketService {
  constructor(private _cmx: CMXService) {}

  public createDataPacket = async (
    mqttPacket: MQTTDataPacket
  ): Promise<jsonDataPacket | null> => {
    const data: any = {};
    // parse data from index 4 to 2nd last index of packet
    for (let i = 4; i < mqttPacket.values.length - 2; i++) {
      data[mqttPacket.values[i].key] = mqttPacket.values[i].value;
    }

    // ahu devices will have equipmentId present in the data object, in other packets, pass equipmentId as undefined
    const identifier = await this._cmx.authenticateAndGetIdentifier(
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
