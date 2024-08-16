import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { DatabaseModule } from '../database/database.module';

describe('LeaderboardController', () => {
  let controller: LeaderboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaderboardController],
      providers: [LeaderboardService],
      imports: [DatabaseModule]
    }).compile();

    controller = module.get<LeaderboardController>(LeaderboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
