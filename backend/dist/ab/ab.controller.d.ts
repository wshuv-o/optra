import { AbService } from './ab.service';
import { UpdateCompanyDto, CreatePitchDeckDto, CreateInvestmentDto } from './ab.dto';
import { CreateInvestorDto } from './ab.dto';
export declare class AbController {
    private abService;
    constructor(abService: AbService);
    logout(body: any): Promise<void>;
    updateCompany(id: number, updateCompanyDto: UpdateCompanyDto): Promise<import("../database/database.entity").Companies>;
    getAllCompanies(): Promise<import("../database/database.entity").Companies[]>;
    getCompanyById(id: number): Promise<import("../database/database.entity").Companies>;
    searchCompaniesByName(name: string): Promise<import("../database/database.entity").Companies[]>;
    searchInvestorsByName(name: string): Promise<import("../database/investor.entity").Investor[]>;
    createPitchDeck(companyId: number, createPitchDeckDto: CreatePitchDeckDto): Promise<import("../database/database.entity").PitchDeck>;
    getPitchDecksByCompany(companyId: number): Promise<import("../database/database.entity").PitchDeck[]>;
    getInvestmentsByPitchDeck(pitchDeckId: number): Promise<import("../database/database.entity").Investment[]>;
    deleteCompany(id: number): Promise<void>;
    addInvestor(createInvestorDto: CreateInvestorDto): Promise<import("../database/investor.entity").Investor>;
    addInvestment(createInvestmentDto: CreateInvestmentDto): Promise<import("../database/database.entity").Investment>;
}
