import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LeaderboardService {
  constructor (private readonly dbService: DatabaseService) {}

  async create(createLeaderboardDto: Prisma.LeaderboardCreateInput) {
    let wordCount = -1
    await this.dbService.word.count().then(n => wordCount = n)
    //Validate correctWords
    if (createLeaderboardDto.correctWords > wordCount) {
      throw new BadRequestException('Invalid correctWords value!')
    }

    //Validate incorrectGuessesPerWord field
    const incorrectGuessesPerWord = createLeaderboardDto.incorrectGuessesPerWord as number[]
    if (incorrectGuessesPerWord.length !== createLeaderboardDto.correctWords + 1 && incorrectGuessesPerWord.length < wordCount
    || (incorrectGuessesPerWord.length !== createLeaderboardDto.correctWords || incorrectGuessesPerWord.length !== createLeaderboardDto.correctWords + 1) && incorrectGuessesPerWord.length === wordCount
    || incorrectGuessesPerWord.length > wordCount) {
      throw new BadRequestException('Invalid incorrectGuessesPerWord array length!')
    }
    incorrectGuessesPerWord.forEach((igpw, i) => {
      if (i === incorrectGuessesPerWord.length - 1) {
        if (igpw > 6) {
          throw new BadRequestException('Invalid incorrectGuessesPerWord value(s)!')
        }
      }
      else {
        if (igpw > 5) {
          throw new BadRequestException('Invalid incorrectGuessesPerWord value(s)!')
        }
      }
    });

    //Validate startDatetime and endDatetime
    if (new Date(createLeaderboardDto.startDatetime) >= new Date(createLeaderboardDto.endDatetime)) {
      throw new Error('startDatetime must be before endDatetime!');
    }

    return this.dbService.leaderboard.create({
      data: createLeaderboardDto
    })
  }

  findTop1000() {
    return `This action returns all leaderboard`;
  }

  searchResultHistory(playerName: string, startDateRange: string, endDateRange: string) {
    return `${playerName},${startDateRange},${endDateRange}`;
  }
}
