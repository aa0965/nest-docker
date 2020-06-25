import { Injectable, Inject } from '@nestjs/common';
import { NATS_CLIENT } from '../constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CMXService {
  constructor(@Inject(NATS_CLIENT) private _nats: ClientProxy) {}

  // authenticate packet from CMX and get identifier information
  public authenticateAndGetIdentifier = async (
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
}
