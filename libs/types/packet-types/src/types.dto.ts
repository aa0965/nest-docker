import { Devices } from 'bl/devices-types';

export class jsonDataPacket {
  client: string;
  site: string;
  rssi: number;
  deviceType: Devices;
  identifier: string;
  deviceId: string;
  counter: number;
  timestamp: number;
  data: Object;
}
