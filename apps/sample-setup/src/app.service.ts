import { Injectable } from '@nestjs/common';

// Write all business logic here, ensure return and parameter type definitions

@Injectable()
export class AppService {
  // param type   // return type
  getHello(name?: string): string {
    return 'Hello ' + name || 'World';
  }
}
