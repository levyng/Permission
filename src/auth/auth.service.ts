import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  
  async getUserInformation(req){
    if (req.user) {
      const user = req.user
      return {
        message: 'fullname: ' + user.fullname + ' - email: ' + user.email
      }
    }
    return 'Login failed'
  }
}
