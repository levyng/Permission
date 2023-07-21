import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  
  async getUserInformation(req){
    if (req.user) {
      const user = req.user;
      if (this.checkGKMail(user.email)){
        return {
          message: 'fullname: ' + user.fullname + ' - email: ' + user.email
        }
      }
      else throw new BadRequestException ("Not Permission!");
    }
    return 'Login failed'
  }

  checkGKMail(mail: string): Boolean{
    const gkName = "giakho.vn"
    if (mail.slice(mail.indexOf("@")+1)===gkName)
      return true;
    else false;
  }
}
