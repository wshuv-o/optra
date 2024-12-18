import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}

export class UpdateCompanyDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    market?: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsString()
    @IsOptional()
    growth?: string;

    @IsString()
    @IsOptional()
    launch_date?: string;
}

export class CreatePitchDeckDto {
    @IsString()
    @IsOptional()
    valuation?: string;

    @IsString()
    @IsOptional()
    funding?: string;

    @IsString()
    @IsOptional()
    pitch_date?: string;
}


export class CreateInvestorDto {
    @IsString()
    full_name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    company_name?: string;

    @IsOptional()
    @IsString()
    phone_number?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsOptional()
    @IsString()
    launch_date?: string;

    @IsOptional()
    @IsString()
    net_worth?: string;

    @IsOptional()
    @IsString()
    company_type?: string;
}

export class CreateInvestmentDto {
    @IsNumber()
    amount_invested: number;

    @IsOptional()
    @IsString()
    investment_date?: string;

    @IsOptional()
    @IsString()
    comments?: string;

    @IsNumber()
    investorId: number;  

    @IsNumber()
    companyId: number;   
}
