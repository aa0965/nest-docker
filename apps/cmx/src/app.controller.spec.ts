import { Test, TestingModule } from '@nestjs/testing';
import { deviceController } from './app.controller';
import { deviceService } from './app.service';

describe('AppController', () => {
  let appController: deviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [deviceController],
      providers: [deviceService],
    }).compile();

    appController = app.get<deviceController>(deviceController);
  });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(appController.getHello()).toBe('Hello World!');
//     });
//   });
});
