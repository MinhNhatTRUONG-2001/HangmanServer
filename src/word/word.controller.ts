import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WordService } from './word.service';
import { Prisma } from '@prisma/client';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post(':topicId')
  create(@Param('topicId') topicId: string, @Body() createWordDto: Prisma.WordCreateInput) {
    return this.wordService.create(topicId, createWordDto);
  }

  @Get()
  findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: Prisma.WordUpdateInput, @Query('topicId') topicId?: string) {
    return this.wordService.update(id, updateWordDto, topicId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordService.remove(id);
  }
}
