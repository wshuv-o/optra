export declare class CreateCompanyDto {
    name: string;
    email: string;
    password: string;
}
export declare class UpdateCompanyDto {
    name?: string;
    market?: string;
    type?: string;
    growth?: string;
    launch_date?: string;
}
export declare class CreatePitchDeckDto {
    valuation?: string;
    funding?: string;
    pitch_date?: string;
}
export declare class CreateInvestorDto {
    full_name: string;
    email: string;
    password: string;
    company_name?: string;
    phone_number?: string;
    address?: string;
    gender?: string;
    launch_date?: string;
    net_worth?: string;
    company_type?: string;
}
export declare class CreateInvestmentDto {
    amount_invested: number;
    investment_date?: string;
    comments?: string;
    investorId: number;
    companyId: number;
}
