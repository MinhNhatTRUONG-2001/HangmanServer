import { Test, TestingModule } from '@nestjs/testing';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { DatabaseModule } from '../database/database.module';

describe('WordController', () => {
  let controller: WordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordController],
      providers: [WordService],
      imports: [DatabaseModule]
    }).compile();

    controller = module.get<WordController>(WordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
