import { Injectable } from '@nestjs/common';
import { Subject, merge } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

import {
  IMiloMqttPacket,
  IMinionMqttPacket,
  IBranchMqttPacket,
  MQTTDataPacket,
  IMinnieMqttPacket
} from 'bl/devices-types';

import { DataPacketService } from './data-packet.service';

@Injectable()
export class PipelinesService {
  constructor(private _dataPacketService: DataPacketService) {}

  /////////////////////////////////
  // Subjects to hold data pipeline
  /////////////////////////////////

  // DATA
  private _jsonDataPipeline = new Subject<
    IMiloMqttPacket | IMinionMqttPacket | IBranchMqttPacket
  >();
  private _binaryBufferDataPipeline = new Subject<IMinnieMqttPacket>();

  // TODO: ADD TYPE DEFINITIONS BELOW

  // STATUS
  private _statusPipeline = new Subject();

  ///////////////////
  // Parsed pipelines
  ///////////////////

  // DATA
  private _parsedJsonDataPipeline = this._jsonDataPipeline.pipe(
    switchMap(this._dataPacketService.createDataPacket),
    filter(msg => !!msg)
  );
  private _parsedBinaryBufferDataPipeline = this._binaryBufferDataPipeline.pipe(
    switchMap(this._dataPacketService.createDataPacket),
    filter(msg => !!msg)
  );

  ///////////////////
  // Public Pipelines
  ///////////////////

  // final data packer pipeline
  public $dataPacketPipeline = merge(
    this._parsedJsonDataPipeline,
    this._parsedBinaryBufferDataPipeline
  );

  // final status pipeline
  public $parsedStatusPipeline = this._statusPipeline.pipe(
    filter(msg => !!msg)
  );

  /////////////////
  // Public Methods
  /////////////////

  public processDataPacket(message: MQTTDataPacket) {
    switch (message.values[0].value) {
      case 2:
        this._binaryBufferDataPipeline.next(message as IMinnieMqttPacket);
        break;
      default:
        this._jsonDataPipeline.next(message as any);
        break;
    }
  }

  public processStatusPacket(message: any) {
    this._statusPipeline.next(message);
  }
}
