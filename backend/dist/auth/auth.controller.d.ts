import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
export declare class AuthController {
    private authService;
    private authGuard;
    constructor(authService: AuthService, authGuard: AuthGuard);
    signIn(signInDto: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    logout(req: any): Promise<void>;
}
