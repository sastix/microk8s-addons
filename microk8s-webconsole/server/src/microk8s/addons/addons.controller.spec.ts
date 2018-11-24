import { Test, TestingModule } from '@nestjs/testing';
import { AddonsController } from './addons.controller';

describe('Addons Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AddonsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AddonsController = module.get<AddonsController>(AddonsController);
    expect(controller).toBeDefined();
  });
});
