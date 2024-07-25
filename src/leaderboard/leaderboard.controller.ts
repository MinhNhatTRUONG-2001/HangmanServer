import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { Prisma } from '@prisma/client';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post()
  create(@Body() createLeaderboardDto: Prisma.LeaderboardCreateInput) {
    return this.leaderboardService.create(createLeaderboardDto);
  }

  @Get('top-1000')
  findTop1000() {
    return this.leaderboardService.findTop1000();
  }

  @Get('search')
  searchResultHistory(@Query('playerName') playerName: string, @Query('startDateRange') startDateRange: string, @Query('endDateRange') endDateRange: string) {
    return this.leaderboardService.searchResultHistory(playerName, startDateRange, endDateRange);
  }
}
