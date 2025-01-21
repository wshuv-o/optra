import { Investment } from "./database.entity";
export declare class Investor {
    id: number;
    full_name: string;
    email: string;
    password: string;
    company_name: string;
    phone_number: string;
    address: string;
    gender: string;
    launch_date: string;
    net_worth: string;
    company_type: string;
    investments: Investment[];
}
