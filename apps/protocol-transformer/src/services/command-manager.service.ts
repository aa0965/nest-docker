import { Injectable } from '@nestjs/common';
import { IMqttAckPacket, IMqttCommandPacket } from '../types.dto';
import { EventEmitter } from 'events';
import { Observable, Observer, Subject } from 'rxjs';
import { commandPacket } from '../shared/packetTypes.dto';

const ACKNOWLEDGE_LOCAL_TOPIC = 'acknowledge';

class commandEmitter extends EventEmitter {
  constructor() {
    super();
  }

  private _ackTimeout = 2500;

  requestAcknowledgement = (counter: number): Observable<boolean> => {
    return Observable.create((observer: Observer<boolean>) => {
      let timer: any;

      const handler = (status: boolean) => {
        console.log('finifhing handler');
        if (timer) clearTimeout(timer);

        observer.next(status);
        observer.complete();
      };

      timer = setTimeout(() => {
        this.removeListener(ACKNOWLEDGE_LOCAL_TOPIC + counter, handler);
        observer.error('Acknowledgement timed out');
      }, this._ackTimeout);

      this.once(ACKNOWLEDGE_LOCAL_TOPIC + counter, handler);
    });
  };

  acknowledge = (counter: number, status: boolean) => {
    console.log('ack recieved');
    this.emit(ACKNOWLEDGE_LOCAL_TOPIC + counter, status);
  };
}

@Injectable()
export class CommandManagerService {
  private _emitter = new commandEmitter();
  private _commandQueue = new Subject<IMqttCommandPacket>();

  public $commandQueue = this._commandQueue.asObservable();

  public sendCommand(commandPacket: commandPacket) {
    // parse incoming command
    const packet: IMqttCommandPacket = {
      counter: commandPacket.counter,
      location: commandPacket.identifier.split('/').join(''),
      payload: commandPacket.commandPayload
    };

    this._commandQueue.next(packet);
    return this._emitter.requestAcknowledgement(packet.counter);
  }

  public handleAcknowledgement(message: IMqttAckPacket) {
    this._emitter.acknowledge(
      message.values[3].value,
      !!message.values[2].value
    );
  }
}
