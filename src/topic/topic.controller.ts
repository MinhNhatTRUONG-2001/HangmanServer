import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicService } from './topic.service';
import { Prisma } from '@prisma/client';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  create(@Body() createTopicDto: Prisma.TopicCreateInput) {
    return this.topicService.create(createTopicDto);
  }

  @Get()
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: Prisma.TopicUpdateInput) {
    return this.topicService.update(id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove(id);
  }
}
