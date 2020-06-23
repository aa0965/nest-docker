import { Test, TestingModule } from '@nestjs/testing';
import { DataPacketService } from './data-packet.service';

describe('DataPacketService', () => {
  let service: DataPacketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataPacketService],
    }).compile();

    service = module.get<DataPacketService>(DataPacketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
