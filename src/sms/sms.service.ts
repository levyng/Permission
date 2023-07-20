import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;
  private
  constructor(
    private configService: ConfigService
  ){
    const accountSid = configService.get('twilio.account_sid');
    const authToken = configService.get<string>('twilio.auth_token');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async initiatePhoneNumberVerification(phoneNumber: string): Promise<any>{
    try{
      const serviceSid = this.configService.get<string>('twilio.service_sid');

      console.log('service SID: ' + serviceSid)
      const result = await this.twilioClient.verify.v2.services(serviceSid)
          .verifications
          .create({ to: phoneNumber, channel: 'sms'})
          .then(verification => {
            console.log('status: ',verification.status)
          })

      return true;
    }catch (error){
      return new  HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async checkVerifiedCode(phoneNumber: string, verificationCode: string): Promise<any> {
    try{
    const serviceSid = this.configService.get<string>('twilio.service_sid');
    
    const result = await this.twilioClient.verify.v2.services(serviceSid)
      .verificationChecks
      .create({to: phoneNumber, code: verificationCode})
    console.log(result.status)
    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }  
    return 'Login success';
  }catch(error){
    console.log(error);
    return new HttpException(error, HttpStatus.BAD_REQUEST);
  }
  }
}
