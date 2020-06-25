import { IsNumber, IsString, IsObject, IsOptional } from 'class-validator';

// version: 1.0.1

enum Devices {
  milo = 0,
  minion = 1,
  minnie = 2,
  branch = 3,
  titan = 4
}

class novaProtocolPacket {
  @IsString()
  client: string;

  @IsString()
  site: string;

  @IsOptional()
  @IsNumber()
  deviceType: Devices;

  @IsString()
  identifier: string;

  @IsString()
  deviceId: string;

  @IsNumber()
  timestamp: number;
}

export class jsonDataPacket extends novaProtocolPacket {
  @IsNumber()
  rssi: number;

  @IsNumber()
  counter: number;

  @IsObject()
  data: Object;
}

enum StatusPacketTypes {
  version = 0,
  titan = 1
}

export class statusPacket extends novaProtocolPacket {
  @IsNumber()
  packetType: StatusPacketTypes;

  @IsObject()
  data: versionStatusPacketData | titanStatuspacketData;
}

export class versionStatusPacketData {
  @IsNumber()
  crc: number;

  @IsNumber()
  version: number;
}

export class titanStatuspacketData {
  @IsNumber()
  status: 2 | 3;

  @IsString()
  route: string;

  @IsString()
  nexthop: string;
}

export class commandPacket extends novaProtocolPacket {
  commandPayload: Buffer;

  @IsNumber()
  counter: number;
}
