import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WordService {
  constructor(private readonly databaseService: DatabaseService) { }

  create(topicId: string, createWordDto: Prisma.WordCreateInput) {
    return this.databaseService.word.create({
      data: {
        word: createWordDto.word.toUpperCase(),
        topic: {
          connect: {
            id: topicId
          }
        }
      }
    });
  }

  findAll() {
    return this.databaseService.word.findMany();
  }

  findOne(id: string) {
    return this.databaseService.word.findUnique({
      where: {
        id
      }
    });
  }

  update(id: string, updateWordDto: Prisma.WordUpdateInput, topicId: string) {
    const dataToUpdate: any = {}
    if (updateWordDto.word) {
      dataToUpdate.word = updateWordDto.word.toString().toUpperCase()
    }
    if (topicId) {
      dataToUpdate.topic = {
        connect: {
          id: topicId
        }
      }
    }
    return this.databaseService.word.update({
      where: {
        id
      },
      data: dataToUpdate
    });
  }

  remove(id: string) {
    return this.databaseService.word.delete({
      where: {
        id
      }
    });
  }
}
