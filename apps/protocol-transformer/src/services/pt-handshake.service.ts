import { Injectable } from '@nestjs/common';

@Injectable()
export class PTHandshakeService {
  private _handshakeDone = false;

  public get handshake() {
    return this._handshakeDone;
  }

  public performHandshake() {
    // make api call to PT interface
    // await for status 200 response

    setTimeout(() => {
      console.log('handshake done!');
      this._handshakeDone = true;
    }, 1000);
  }
}
