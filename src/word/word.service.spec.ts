import { Test, TestingModule } from '@nestjs/testing';
import { WordService } from './word.service';
import { DatabaseModule } from '../database/database.module';

describe('WordService', () => {
  let service: WordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordService],
      imports: [DatabaseModule]
    }).compile();

    service = module.get<WordService>(WordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
