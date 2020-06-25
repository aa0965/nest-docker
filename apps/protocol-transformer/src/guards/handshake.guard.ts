import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PTHandshakeService } from '../services/pt-handshake.service';

@Injectable()
export class HandshakeGuard implements CanActivate {
  constructor(private _handshakeService: PTHandshakeService) {}

  canActivate(context: ExecutionContext): boolean {
    return this._handshakeService.handshake;
  }
}
