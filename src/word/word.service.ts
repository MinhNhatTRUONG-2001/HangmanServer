import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class WordService {
  constructor (private readonly dbService: DatabaseService) {}

  findAllWordsWithTopic() {
    return this.dbService.word.findMany({
      select: {
        id: true,
        word: true,
        topic: {
          select: {
            name: true
          }
        }
      }
    });
  }
}
