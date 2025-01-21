import { Repository } from 'typeorm';
import { Companies } from 'src/database/database.entity';
import { TempSignupDataService } from './temp-signup-data.service';
export declare class SignupService {
    private IRepo;
    private readonly tempSignupDataService;
    private transporter;
    constructor(IRepo: Repository<Companies>, tempSignupDataService: TempSignupDataService);
    initiateSignUp(name: string, email: string, password: string): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
        user: {
            name: any;
            email: any;
        };
    }>;
}
