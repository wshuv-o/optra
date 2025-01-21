import { Repository } from 'typeorm';
import { Companies } from '../database/database.entity';
import { CreateCompanyDto, UpdateCompanyDto, CreatePitchDeckDto, CreateInvestmentDto } from './ab.dto';
import { PitchDeck } from '../database/database.entity';
import { Investment } from '../database/database.entity';
import { Investor } from '../database/investor.entity';
import { CreateInvestorDto } from './ab.dto';
export declare class AbService {
    private companiesRepo;
    private pitchDeckRepo;
    private investmentRepo;
    private investorRepo;
    private dynamicSecrets;
    constructor(companiesRepo: Repository<Companies>, pitchDeckRepo: Repository<PitchDeck>, investmentRepo: Repository<Investment>, investorRepo: Repository<Investor>);
    createCompany(createCompanyDto: CreateCompanyDto): Promise<Companies>;
    logout(userId: number): Promise<void>;
    updateCompany(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Companies>;
    getAllCompanies(): Promise<Companies[]>;
    getCompanyById(id: number): Promise<Companies>;
    searchCompaniesByName(name: string): Promise<Companies[]>;
    searchInvestorsByName(name: string): Promise<Investor[]>;
    createPitchDeck(companyId: number, createPitchDeckDto: CreatePitchDeckDto): Promise<PitchDeck>;
    getPitchDecksByCompany(companyId: number): Promise<PitchDeck[]>;
    getInvestmentsByPitchDeck(pitchDeckId: number): Promise<Investment[]>;
    deleteCompany(id: number): Promise<void>;
    addInvestor(createInvestorDto: CreateInvestorDto): Promise<Investor>;
    addInvestment(createInvestmentDto: CreateInvestmentDto): Promise<Investment>;
}
