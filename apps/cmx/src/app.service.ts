import { Injectable, Dependencies } from '@nestjs/common';

@Injectable()
@Dependencies('DEVICE_MODEL')
export class deviceService {
  deviceModel: any;
  constructor(deviceModel) {
    this.deviceModel = deviceModel;
  }

  async getDeviceById(id:String) {
    const device = await this.deviceModel.findOne({name:id})
    return device;
  }
  
  async getDeviceByLocation(client:String,site:string,queryparams:any) {
    
    for (const property in queryparams) {
      if(!(!!queryparams[property])) {delete queryparams[property];}
    }
    const device = await this.deviceModel.find
    ({
      client,
      site,
      ...queryparams
    })
    return device;
  }

  async getDeviceByIdAndEquipment(id:String,equipmentId:Number) {
    const device = await this.deviceModel.findOne
    ({
      deviceId:id,
      equipmentId:equipmentId
    })
    const identifier = {
      block:device.block,
      floor:device.floor
    }
    return identifier;
  }
 
  async insertCommissioning(obj:any){
    const newDevice = new this.deviceModel({...obj});
    await newDevice.save();
    console.log(newDevice)
    return newDevice;
  }

  async findAll() {
    return this.deviceModel.find().exec();
  }
}