import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import Verify from 'twilio/lib/rest/Verify';
import VerifyBase from 'twilio/lib/rest/VerifyBase';
import initMB, {
  initClient,
  Message,
  MessageBird,
} from 'messagebird';
import { Vonage} from "@vonage/server-sdk";

import {VerifyWorkflows} from '@vonage/verify/dist/enums/index';
import { SmsRequest } from 'src/entities/sms-request.entities';
@Injectable()
export class SmsService {
  private smsRequest: SmsRequest;
  private twilioClient: Twilio;
  private phone: string;
  // private messageBirdClient:  MessageBird;
  private vonageClient: Vonage;
  private vonageRequestId: string;
  private vonageStatus: string;

  constructor(
    private configService: ConfigService
  ){
    /*Verify with Twilio*/
    const accountSid = configService.get('twilio.account_sid');
    const authToken = configService.get<string>('twilio.auth_token');
    this.twilioClient = new Twilio(accountSid, authToken);

    // const messageBirdKey = configService.get('message_bird.key');
    // this.messageBirdClient = initClient(messageBirdKey)

    /*Verify with Vogane*/
    const apiKey = configService.get<string>('vonage.api_key');
    const apiSecret = configService.get<string>('vonage.api_secret');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.vonageClient = new Vonage({apiKey:apiKey,apiSecret: apiSecret});

  }

  async initVerifyVonage(phoneNumber: string): Promise<any>{
    try{
      this.vonageClient.verify.start({
        number: phoneNumber,
        brand: "Vonage",
        workflowId: VerifyWorkflows.SMS
      })
        .then(resp => {
          this.vonageRequestId=resp.request_id;
          console.log('reqId:',resp.requestId,', status:',resp.status);
        })
        .catch(err => {
          throw new BadRequestException('Error==', err);
        })
      return true;
    } catch (err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyCodeVonage(code: string): Promise<any>{
    try{
      this.vonageClient.verify.check(this.vonageRequestId, code)
      .then(resp => {        
        console.log('reqId===',resp.requestId,', status===',resp.status);
      })
      .catch(err =>{
        throw new BadRequestException('Error==', err);
      });
      return true;
    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async initVerifyMB(phoneNumber): Promise<any>{
  //   try{
  //     this.formatPhoneNumber(phoneNumber);
  //     return await this.messageBirdClient.verify.create(
  //       this.phone,
  //       {
  //         type:"sms",
  //         tokenLength: 6
  //       }, function (err, response) {
  //       if (err)
  //         console.log("error: ",err);
  //       else console.log('res===',response);
  //   });
      
  //   }catch(e){
  //     return new  HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // async confirmCodeMB(code: string): Promise<any>{
  //   try{
  //     console.log('phone number === ',this.phone,',code===',code);      
  //     const result = await this.messageBirdClient.verify.verify(
  //       this.phone,
  //       code,
  //       function (err, res){
  //         if(!err)
  //           return res;
  //         else return err;
  //       }
  //     )
  //     this.phone='';  
  //     return 'Login success';
  // }catch(error){
  //   console.log(error);
  //   return new HttpException(error, HttpStatus.BAD_REQUEST);
  // }
  // }

  async initiatePhoneNumberVerification(phoneNumber: string): Promise<any>{
    try{
      this.formatPhoneNumber(phoneNumber);
      const serviceSid = this.configService.get<string>('twilio.service_sid');
      console.log('service SID: ' + serviceSid);
      const result = await this.twilioClient.verify.v2.services(serviceSid)
          .verifications
          .create({ to: this.phone, channel: 'sms'})
          .then(verification => {
            console.log('status: ',verification.status,' id: ',verification.sid);
          })
          // console.log('result===',result);
      return true;
    }catch (error){
      return new  HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  formatPhoneNumber(phoneNumber: string){
    try{
      if (phoneNumber.charAt(0)==='0')
        this.phone='+84'.concat(phoneNumber.substring(1));
      else if (phoneNumber.startsWith('+84'))
        this.phone=phoneNumber
      else
       throw new BadRequestException ('Wrong phone number!');
    }catch{
      throw new BadRequestException ('Wrong phone number!');
    }
  }

  async getPhoneNumber(){
    const phoneNumber = this.initiatePhoneNumberVerification;
    console.log('phoneNumber===',phoneNumber);
    console.log('this.phone===',this.phone);
    return this.initiatePhoneNumberVerification;
  }

  async checkVerifiedCode(verificationCode: string): Promise<any> {
    try{
      console.log('phone number === ',this.phone,',code===',verificationCode);
      const serviceSid = this.configService.get<string>('twilio.service_sid');
      
      const result = await this.twilioClient.verify.v2.services(serviceSid)
        .verificationChecks
        .create({to: this.phone, code: verificationCode});
      
      if (!result.valid || result.status !== 'approved') {
        throw new BadRequestException('Wrong code provided');
      }
      this.phone='';  
      return 'Login success';
  }catch(error){
    console.log(error);
    return new HttpException(error, HttpStatus.BAD_REQUEST);
  }
  }
}
