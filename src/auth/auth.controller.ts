import {
  Controller,
  UseGuards,
  Get,
  Res,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthGuard } from 'src/core/guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService){}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Req() req){}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req) {
    return await this.authService.getUserInformation(req)
  }
}
