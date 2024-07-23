import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TopicModule } from './topic/topic.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [DatabaseModule, TopicModule, WordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
