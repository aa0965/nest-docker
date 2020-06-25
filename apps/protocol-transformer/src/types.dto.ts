export enum StatusPacketTypes {
  version = 0,
  titan = 1
}

export enum Devices {
  milo = 0,
  minion = 1,
  minnie = 2,
  branch = 3,
  titan = 4
}

export type MQTTDataPacket =
  | IMiloMqttPacket
  | IMinionMqttPacket
  | IMinnieMqttPacket
  | IBranchMqttPacket;

// MQTT Data Packets

export class IMiloMqttPacket {
  values: [
    {
      key: 'deviceType';
      value: 0;
    },
    {
      key: 'id';
      value: string;
    },
    {
      key: 'rssi';
      value: number;
    },
    {
      key: 'counter';
      value: number;
    },
    {
      key: 'temperature';
      value: number;
    },
    {
      key: 'humidity';
      value: number;
    },
    {
      key: 'timestamp';
      value: string;
    },
    {
      key: 'date';
      value: string;
    }
  ];
}

export class IMinionMqttPacket {
  values: [
    {
      key: 'deviceType';
      value: 1;
    },
    {
      key: 'id';
      value: string;
    },
    {
      key: 'rssi';
      value: number;
    },
    {
      key: 'counter';
      value: number;
    },
    {
      key: 'power1';
      value: number;
    },
    {
      key: 'power2';
      value: number;
    },
    {
      key: 'power3';
      value: number;
    },
    {
      key: 'T_power';
      value: number;
    },
    {
      key: 'T_AcEn';
      value: number;
    },
    {
      key: 'powf1';
      value: number;
    },
    {
      key: 'lrms1';
      value: number;
    },
    {
      key: 'powf2';
      value: number;
    },
    {
      key: 'lrms2';
      value: number;
    },
    {
      key: 'powf3';
      value: number;
    },
    {
      key: 'lrms3';
      value: number;
    },
    {
      key: 'timestamp';
      value: string;
    },
    {
      key: 'date';
      value: string;
    }
  ];
}

export class IMinnieMqttPacket {
  values: [
    {
      key: 'deviceType';
      value: 2;
    },
    {
      key: 'id';
      value: string;
    },
    {
      key: 'rssi';
      value: number;
    },
    {
      key: 'counter';
      value: number;
    },
    {
      key: 'payload_len';
      value: number;
    },
    {
      key: 'msg';
      value: string;
    },
    {
      key: 'timestamp';
      value: string;
    },
    {
      key: 'date';
      value: string;
    }
  ];
}

export class IBranchMqttPacket {
  values: [
    {
      key: 'deviceType';
      value: 3;
    },
    {
      key: 'id';
      value: string;
    },
    {
      key: 'rssi';
      value: number;
    },
    {
      key: 'counter';
      value: number;
    },
    {
      key: 'temperature';
      value: number;
    },
    {
      key: 'humidity';
      value: number;
    },
    {
      key: 'timestamp';
      value: string;
    },
    {
      key: 'date';
      value: string;
    }
  ];
}

// MQTT Status packets

export type MQTTStatusPacket =
  | IMqttVersionStatusPacket
  | IMqttTitanStatusPacket;

export class IMqttVersionStatusPacket {
  values: [
    {
      key: 'deviceType';
      value: 0 | 1 | 2 | 3;
    },
    {
      key: 'id';
      value: string;
    },
    {
      key: 'crc';
      value: number;
    },
    {
      key: 'version';
      value: number;
    },
    {
      key: 'timestamp';
      value: string;
    },
    {
      key: 'date';
      value: string;
    }
  ];
}

export class IMqttTitanStatusPacket {
  values: [
    {
      key: 'deviceType';
      value: 4;
    },
    {
      key: 'id';
      value: string;
    },
    {
      key: 'status';
      value: 2 | 3;
    },
    {
      key: 'route';
      value: string;
    },
    {
      key: 'nexthop';
      value: string;
    },
    {
      key: 'timestamp';
      value: string;
    },
    {
      key: 'date';
      value: string;
    }
  ];
}
