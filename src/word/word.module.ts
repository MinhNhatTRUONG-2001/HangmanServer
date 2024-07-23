import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WordController],
  providers: [WordService],
})
export class WordModule {}
