import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Leaderboard } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LeaderboardService {
  constructor(private readonly dbService: DatabaseService) { }
  
  async create(createLeaderboardDto: Prisma.LeaderboardCreateInput) {
    let wordCount = -1
    await this.dbService.word.count().then(n => wordCount = n)
    //Validate playerName
    if (createLeaderboardDto.playerName.length > 50) {
      throw new BadRequestException('Invalid playerName value!')
    }

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
      throw new BadRequestException('startDatetime must be before endDatetime!');
    }

    return this.dbService.leaderboard.create({
      data: createLeaderboardDto
    })
  }

  async findTop1000() {
    let result: Leaderboard[] = []
    //Sort the leaderboard by correctWords descendingly...
    await this.dbService.leaderboard.findMany({
      orderBy: [
        {
          correctWords: 'desc',
        }
      ]
    }).then(data => result = data);
    //...then sort the leaderboard by sum of incorrectGuessesPerWord and then timePlayed descendingly.
    result.sort((a, b) => {
      if (a.correctWords === b.correctWords) {
        const sumIgpwA = a.incorrectGuessesPerWord.reduce((total, num) => total + num, a.incorrectGuessesPerWord[0])
        const sumIgpwB = b.incorrectGuessesPerWord.reduce((total, num) => total + num, b.incorrectGuessesPerWord[0])
        if (sumIgpwA !== sumIgpwB) {
          return sumIgpwA - sumIgpwB
        }
        else {
          const timePlayedA = a.endDatetime.getTime() - a.startDatetime.getTime()
          const timePlayedB = b.endDatetime.getTime() - b.startDatetime.getTime()
          return timePlayedA - timePlayedB
        }
      }
    })
    return result.slice(0, 1000)
  }

  searchResultHistory(pName: string, startDateRange: string, endDateRange: string) {
    //Validate playerName
    if (pName && pName.length > 50) {
      throw new BadRequestException('Invalid playerName value!')
    }
    //Validate startDateRange and endDateRange
    if (new Date(startDateRange) >= new Date(endDateRange)) {
      throw new BadRequestException('startDatetime must be before endDatetime!');
    }

    const conditionList = []
    if (pName) {
      conditionList.push({
        playerName: {
          contains: pName,
          mode: 'insensitive'
        }
      })
    }
    if (startDateRange) {
      conditionList.push({
        startDatetime: {
          gte: new Date(startDateRange)
        }
      })
    }
    if (endDateRange) {
      conditionList.push({
        startDatetime: {
          lte: new Date(endDateRange)
        }
      })
    }

    return this.dbService.leaderboard.findMany({
      where: {
        AND: conditionList
      }
    });
  }
}
