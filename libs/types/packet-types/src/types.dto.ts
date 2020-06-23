import { Devices } from 'bl/devices-types';

export class jsonDataPacket {
  client: string;
  site: string;
  deviceType: Devices;
  identifier: string;
  deviceId: string;
  counter: number;
  timestamp: Date;
  data: Object;
}
