import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Redirect, Render, Res, UseGuards } from '@nestjs/common';
import { SmsService } from './sms.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import SmsLoginDto from './dto/sms-login.dto';
import SmsVerifyDto from './dto/sms-verify.dto';
import { promises } from 'dns';
import {Response} from 'express'; 

@Controller('sms')
export class SmsController {
  constructor (private readonly smsService: SmsService){}

  @Get('')
  @Render("otp-login")
  async getPhoneNumber(){}

  @UseGuards(JwtStrategy)
  @Post('')
  @Redirect("/sms/verify")
  async initiatePhoneNumberVerification(@Body() sms: SmsLoginDto){
    return await this.smsService.initVerifyMB(sms.phoneNumber);
  }

  @Get('/verify')
  @Render("otp-verify")
  async verifyOtp(){}

  @Post('/verify')
  @UseGuards(JwtStrategy)
  async verifiedCode(@Body() req: SmsVerifyDto, @Res() res: Response){
    const result =  await this.smsService.checkVerifiedCode(req.code);
    console.log('status===',result.status)
    if (String(result.status)=='400')
      res.status(HttpStatus.BAD_REQUEST).send('Login failed');
    else res.status(HttpStatus.OK).send('Login success');
  }


}
