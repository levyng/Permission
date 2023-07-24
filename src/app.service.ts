import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { LoggerService } from './sms/dto/logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: LoggerService
  ){}
}
