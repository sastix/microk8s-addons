import { Test, TestingModule } from '@nestjs/testing';
import { PowerController } from './power.controller';

describe('Power Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PowerController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PowerController = module.get<PowerController>(PowerController);
    expect(controller).toBeDefined();
  });
});
