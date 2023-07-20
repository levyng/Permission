import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ConfigModule } from '@nestjs/config';
import { SmsController } from './sms.controller';

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [SmsController],
  providers: [SmsService]
})
export class SmsModule {}
