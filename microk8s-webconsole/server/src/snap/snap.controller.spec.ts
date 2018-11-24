import { Test, TestingModule } from '@nestjs/testing';
import { SnapController } from './snap.controller';

describe('Snap Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SnapController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SnapController = module.get<SnapController>(SnapController);
    expect(controller).toBeDefined();
  });
});
