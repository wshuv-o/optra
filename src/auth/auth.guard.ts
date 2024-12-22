import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthProvider } from './auth.provider';
import { Reflector } from '@nestjs/core'; 
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly reflector: Reflector, 
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return false; 
    }

    try {
      const user = this.authProvider.verifyToken(token);
      request.user = user;
      return true;
    } catch (error) {
      return false; 
    }
  }
}
