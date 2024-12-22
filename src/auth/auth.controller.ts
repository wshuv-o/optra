import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { Public } from './public.decorator';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto ) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
  
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  