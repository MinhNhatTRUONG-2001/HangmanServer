import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardService } from './leaderboard.service';
import { DatabaseModule } from '../database/database.module';

describe('LeaderboardService', () => {
  let service: LeaderboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderboardService],
      imports: [DatabaseModule]
    }).compile();

    service = module.get<LeaderboardService>(LeaderboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
