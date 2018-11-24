import { Test, TestingModule } from '@nestjs/testing';
import { VersionController } from './version.controller';

describe('Version Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [VersionController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: VersionController = module.get<VersionController>(VersionController);
    expect(controller).toBeDefined();
  });
});
