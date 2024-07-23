import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TopicService {
  constructor (private readonly databaseService: DatabaseService) {}

  create(createTopicDto: Prisma.TopicCreateInput) {
    return this.databaseService.topic.create({
      data: createTopicDto
    });
  }

  findAll() {
    return this.databaseService.topic.findMany();
  }

  findOne(id: string) {
    return this.databaseService.topic.findUnique({
      where: {
        id
      },
      include: {
        words: true
      }
    });
  }

  update(id: string, updateTopicDto: Prisma.TopicUpdateInput) {
    return this.databaseService.topic.update({
      where: {
        id
      },
      data: updateTopicDto
    });
  }

  async remove(id: string) {
    let deletedTopicAndItsWords = {}
    await this.findOne(id).then(data => deletedTopicAndItsWords = data)
    const deleteWords = this.databaseService.word.deleteMany({
      where: {
        topicId: id
      }
    })
    const deleteTopic = this.databaseService.topic.delete({
      where: {
        id
      }
    })
    await this.databaseService.$transaction([deleteWords, deleteTopic])
    return deletedTopicAndItsWords
  }
}
