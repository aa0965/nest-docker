import { Controller, Get, Post, Body, Param, Inject,Req, Query  } from '@nestjs/common';
import { deviceService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
@Controller()
export class deviceController {
  constructor(private readonly deviceService: deviceService, 
    @Inject('CMX') private client: ClientProxy,
  ) {
    // setTimeout(()=>this.client.emit('hell',{data:'data'}),1000)
    // setTimeout(()=>this.client.emit('hell',{data:'data'}),2000)
    // setTimeout(()=>this.client.emit('hell',{data:'data'}),3000)
    // setTimeout(()=>this.client.emit('hell',{data:'data'}),4000)
    // setTimeout(()=>this.client.emit('hell',{data:'data'}),5000)
  }

  @Get(':id')
  async getDevice(@Param('id') id:string):Promise<any> {
    console.log(id)
    const device = await this.deviceService.getDeviceById(id);
    return device;
  }

  @Get('/:client/:site')
  async getDevices(@Param('client') client:string, @Param('site') site:string,@Query('block') block:string,@Query('floor') floor:string,@Query('deviceType') deviceType:string):Promise<any> {
    const identifier = {block,floor,deviceType}
    const devices = await this.deviceService.getDeviceByLocation(client,site,identifier);
    return devices;
  }

  // @Get(':id')
  // async getDevice(@Param('id') id:string):Promise<any> {
  //   const device = await this.deviceService.getDeviceById(id);
  //   return device;
  // }

  @MessagePattern({ cmd: 'find_by_id_&_eid' })
  accumulate(data: {deviceId:string,equipmentId:number}): any {
    return this.deviceService.getDeviceByIdAndEquipment(data.deviceId,data.equipmentId)
  }

  @Post()
  adddevice(@Body() device:{} ):any {

    this.deviceService.insertCommissioning(device)
    return device
  }

  
}
