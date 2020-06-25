import { Injectable } from '@nestjs/common';
import { MQTTStatusPacket, StatusPacketTypes } from '../types.dto';
import { statusPacket } from '../shared/packetTypes.dto';
import { config } from '../config';
import { CMXService } from './cmx.service';

@Injectable()
export class StatusPacketService {
  constructor(private _cmx: CMXService) {}

  public createStatusPacket = async (
    mqttPacket: MQTTStatusPacket
  ): Promise<statusPacket | null> => {
    // store data as object
    const data: any = {};
    for (let i = 2; i < mqttPacket.values.length - 2; i++) {
      data[mqttPacket.values[i].key] = mqttPacket.values[i].value;
    }

    const identifier = await this._cmx.authenticateAndGetIdentifier(
      mqttPacket.values[1].value
    );
    if (!identifier) return null;

    let packetType =
      mqttPacket.values[0].value === 4
        ? StatusPacketTypes.titan
        : StatusPacketTypes.version;

    const packet: statusPacket = {
      client: config.client,
      site: config.site,
      deviceType: mqttPacket.values[0].value,
      deviceId: mqttPacket.values[1].value,
      identifier,
      data,
      packetType,
      timestamp: Date.now()
    };

    return packet;
  };
}
