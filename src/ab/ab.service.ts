//ab/ab.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Companies } from './ab.entity';
import { CreateCompanyDto, UpdateCompanyDto, CreatePitchDeckDto, CreateInvestmentDto } from './ab.dto';
import { PitchDeck } from './ab.entity';
import { Investment } from './ab.entity';
import { Investor } from './investor.entity';
import { CreateInvestorDto } from './ab.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AbService {    
  private dynamicSecrets = new Map<number, string>();
  constructor(
  @InjectRepository(Companies) private companiesRepo: Repository<Companies>,
  @InjectRepository(PitchDeck) private pitchDeckRepo: Repository<PitchDeck>,
  @InjectRepository(Investment) private investmentRepo: Repository<Investment>,
  @InjectRepository(Investor) private investorRepo: Repository<Investor>,
  ) {}

  // 1. Signup
  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Companies> {
    const company = this.companiesRepo.create(createCompanyDto);
    return this.companiesRepo.save(company);
  }

  // 2. Login
  // async login(email: string, password: string): Promise<Companies> {
  //   const company = await this.companiesRepo.findOne({ where: { email, password } });
  //   if (!company) throw new NotFoundException('Invalid email or password');
  //   return company;
  // }

  // async login(email: string, password: string): Promise<{ access_token: string }> {
  //   const company = await this.companiesRepo.findOne({ where: { email } });
  //   if (!company) throw new NotFoundException('Invalid email or password');
  //   const isPasswordValid = bcrypt.compare(password, company.password);
  //   if (!isPasswordValid) throw new NotFoundException('Invalid email or password');
  //   const secret = await bcrypt.genSalt();
  //   this.dynamicSecrets.set(company.id, secret);
  //   console.log("login: ",this.dynamicSecrets)

  //   // Create JWT token
  //   const payload = { email: company.email, sub: company.id };
  //   const access_token = this.jwtService.sign(payload, { secret });
  //   return { access_token };
  // }

  // Logout function
  async logout(userId: number): Promise<void> {
    console.log("logout: ", this.dynamicSecrets)

    if (this.dynamicSecrets.has(userId)) {
      this.dynamicSecrets.delete(userId);
      console.log("login: ",this.dynamicSecrets)

    } else {
      throw new NotFoundException('Session not found');
    }
  }

  // Validate token
  // async validateToken(token: string, userId: number): Promise<boolean> {
  //   const secret = this.dynamicSecrets.get(userId);
  //   if (!secret) throw new NotFoundException('Session not found for this user');

  //   try {
  //     this.jwtService.verify(token, { secret });
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }

  // 3. Update Company Details
  async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Companies> {
    const company = await this.companiesRepo.findOne({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
    Object.assign(company, updateCompanyDto);
    return this.companiesRepo.save(company);
  }

  // 4. Fetch all company details
  async getAllCompanies(): Promise<Companies[]> {
    return this.companiesRepo.find();
  }

  // 5. Fetch company details by ID
  async getCompanyById(id: number): Promise<Companies> {
    const company = await this.companiesRepo.findOne({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  // 6. Search companies by name
  async searchCompaniesByName(name: string): Promise<Companies[]> {
    return this.companiesRepo.findBy({ name: Like(`%${name}%`) });
  }

  // 7. Search investors by name
  async searchInvestorsByName(name: string): Promise<Investor[]> {
    return this.investorRepo.findBy({ full_name: Like(`%${name}%`) });
  }

  // 8. Create PitchDeck
  async createPitchDeck(companyId: number, createPitchDeckDto: CreatePitchDeckDto): Promise<PitchDeck> {
    const company = await this.companiesRepo.findOne({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    const pitchDeck = this.pitchDeckRepo.create({ ...createPitchDeckDto, company });
    return this.pitchDeckRepo.save(pitchDeck);
  }

  // 9. Fetch all pitch decks by company id
  async getPitchDecksByCompany(companyId: number): Promise<PitchDeck[]> {
    const company = await this.companiesRepo.findOne({ where: { id: companyId }, relations: ['pitchDecks'] });
    if (!company) throw new NotFoundException('Company not found');
    return company.pitchDecks;
  }

  // 10. Fetch all investments by pitchdeck id
  async getInvestmentsByPitchDeck(pitchDeckId: number): Promise<Investment[]> {
    const investments = await this.investmentRepo.find({ where: { id: pitchDeckId }, relations: ['investor'] });
    if (!investments) throw new NotFoundException('No investments found for this pitch deck');
    return investments;
  }

  // 11. Delete account
  async deleteCompany(id: number): Promise<void> {
    const result = await this.companiesRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Company not found');
  }

  //12. Add investor
  async addInvestor(createInvestorDto: CreateInvestorDto): Promise<Investor> {
    const investor = this.investorRepo.create(createInvestorDto); 
    return await this.investorRepo.save(investor);
  }

  //13. add investment
  async addInvestment(createInvestmentDto: CreateInvestmentDto): Promise<Investment> {
    const { investorId, companyId, ...investmentData } = createInvestmentDto;

    const investor = await this.investorRepo.findOne({where: {id: investorId}});
    if (!investor) {
      throw new Error('Investor not found');
    }

    const company = await this.companiesRepo.findOne({where: {id: companyId}});
    if (!company) {
      throw new Error('Company not found');
    }

    const investment = this.investmentRepo.create({
      ...investmentData,
      investor,
      company,
    });
    return await this.investmentRepo.save(investment);
  }
}
