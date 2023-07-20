import { Body, Controller, Get, HttpStatus, Post, Render, Res, UseGuards } from '@nestjs/common';
import { SmsService } from './sms.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import SmsLoginDto from './dto/sms-login.dto';
import SmsVerifyDto from './dto/sms-verify.dto';
import { promises } from 'dns';

@Controller('sms')
export class SmsController {
  constructor (private readonly smsService: SmsService){}

  @Get('')
  @Render("otp-login")
  async getPhoneNumber(){}

  @UseGuards(JwtStrategy)
  @Post('')
  async initiatePhoneNumberVerification(@Body() sms: SmsLoginDto){
    return await this.smsService.initiatePhoneNumberVerification(sms.phoneNumber);
    // return HttpStatus.CREATED;
  }

  @Get('/verify')
  @Render("otp-verify")
  async verify(){}

  @Post('/verify')
  @UseGuards(JwtStrategy)
  async verifiedCode(@Body() req: SmsVerifyDto){
    return await this.smsService.checkVerifiedCode(req.phoneNumber, req.code);
  }

}
