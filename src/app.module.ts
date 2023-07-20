import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './configuration/config';
import { AuthModule } from './auth/auth.module';
import { SmsController } from './sms/sms.controller';
import { SmsModule } from './sms/sms.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    AuthModule,
    SmsModule,
    LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
