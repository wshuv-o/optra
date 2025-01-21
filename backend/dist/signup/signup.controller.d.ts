import { SignupService } from './signup.service';
export declare class SignupController {
    private readonly signupService;
    constructor(signupService: SignupService);
    signUp(body: {
        name: string;
        email: string;
        password: string;
        confirm_pass: string;
    }): Promise<{
        message: string;
    }>;
    verifyOtp(body: any): Promise<{
        message: string;
        user: {
            name: any;
            email: any;
        };
    }>;
}
