import { Controller, Get } from '@nestjs/common';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get('all')
  findAllWordsWithTopic() {
    return this.wordService.findAllWordsWithTopic();
  }
}
