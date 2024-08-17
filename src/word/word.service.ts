import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class WordService {
  constructor (private readonly dbService: DatabaseService) {}

  async findAllWordsWithTopic() {
    let result = []
    await this.dbService.word.findMany({
      select: {
        id: true,
        word: true,
        topic: {
          select: {
            name: true
          }
        }
      }
    }).then(data => result = data)
    const stringifiedResult = JSON.stringify(result)
    return CryptoJS.AES.encrypt(stringifiedResult, process.env["CRYPTO_SECRET_KEY"]).toString();
  }
}
