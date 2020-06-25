enum Devices {
  milo = 0,
  minion = 1,
  minnie = 2,
  branch = 3,
  titan = 4
}

class novaProtocolPacket {
  client: string;
  site: string;
  deviceType: Devices;
  identifier: string;
  deviceId: string;
  timestamp: number;
}

export class jsonDataPacket extends novaProtocolPacket {
  rssi: number;
  counter: number;
  data: Object;
}

enum StatusPacketTypes {
  version = 0,
  titan = 1
}

export class statusPacket extends novaProtocolPacket {
  packetType: StatusPacketTypes;
  data: versionStatusPacketData | titanStatuspacketData;
}

export class versionStatusPacketData {
  crc: number;
  version: number;
}

export class titanStatuspacketData {
  status: 2 | 3;
  route: string;
  nexthop: string;
}
