import { Test, TestingModule } from '@nestjs/testing';
import { BushosController } from './bushos.controller';

describe('BushosController', () => {
  let controller: BushosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BushosController],
    }).compile();

    controller = module.get<BushosController>(BushosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
