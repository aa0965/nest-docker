import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import {
  IMiloMqttPacket,
  IMinionMqttPacket,
  IBranchMqttPacket,
  MQTTDataPacket,
  IMinnieMqttPacket
} from 'bl/devices-types';
import { DataPacketService } from './data-packet/data-packet.service';

@Injectable()
export class MainService {
  constructor(private _dataPacketService: DataPacketService) {
    // split the pipeline to different device types
    this._mqttPipeline.subscribe(msg => {
      switch (msg.values[0].value) {
        case 0:
          this._miloPipeline.next(msg as IMiloMqttPacket);
          break;
        case 1:
          this._minionPipeline.next(msg as IMinionMqttPacket);
          break;
        case 2:
          this._minniePipeline.next(msg as IMinnieMqttPacket);
          break;
        case 3:
          this._branchPipeline.next(msg as IBranchMqttPacket);
      }
    });
  }

  private _mqttPipeline = new Subject<MQTTDataPacket>();

  private _miloPipeline = new Subject<IMiloMqttPacket>();
  private _minionPipeline = new Subject<IMinionMqttPacket>();
  private _minniePipeline = new Subject<IMinnieMqttPacket>();
  private _branchPipeline = new Subject<IBranchMqttPacket>();

  public $miloPipeline = this._miloPipeline.pipe(
    switchMap(this._dataPacketService.createDataPacket),
    filter(msg => !!msg)
  );
  public $minionPipeline = this._minionPipeline.pipe(
    switchMap(this._dataPacketService.createDataPacket),
    filter(msg => !!msg)
  );
  // public $minniePipeline = this._minniePipeline.pipe(switchMap(this._dataPacketService.createDataPacket));
  public $branchPipeline = this._branchPipeline.pipe(
    switchMap(this._dataPacketService.createDataPacket),
    filter(msg => !!msg)
  );

  public processDataPacket(message: MQTTDataPacket) {
    this._mqttPipeline.next(message);
  }
}
