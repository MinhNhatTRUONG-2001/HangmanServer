import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  itWorks(): string {
    return '<h1>Hangman API</h1><p>If you see this page, that means the server is running successfully!</p>';
  }
}
