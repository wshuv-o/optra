import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AbService } from './ab.service';
import { CreateCompanyDto, UpdateCompanyDto, CreatePitchDeckDto, CreateInvestmentDto } from './ab.dto';
import { CreateInvestorDto } from './ab.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/public.decorator';
@Controller('ab')
// @UseGuards(AuthGuard)
export class AbController {
    constructor(private abService: AbService) {}

    // 1. Signup
    @Public()
    @Post('signup')
    async signup(@Body() createCompanyDto: CreateCompanyDto) {
        return this.abService.createCompany(createCompanyDto);
    }

    // 2. Login
    @Public()
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.abService.login(body.email, body.password);
    }

    // 3. Update Company Details
    @Patch(':id')
    async updateCompany(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
        return this.abService.updateCompany(id, updateCompanyDto);
    }

    // 4. Fetch all company details
    @Public()
    @Get('companies')
    async getAllCompanies() {
        return this.abService.getAllCompanies();
    }

    // 5. Fetch company details by ID
    @Get('companies/:id')
    async getCompanyById(@Param('id') id: number) {
        return this.abService.getCompanyById(id);
    }

    // 6. Search companies by name (using param)
    @Get('companies/search/:name')
    async searchCompaniesByName(@Param('name') name: string) {
        return this.abService.searchCompaniesByName(name);
    }

    // 7. Search investors by name (using param)
    @Get('investors/search/:name')
    async searchInvestorsByName(@Param('name') name: string) {
        return this.abService.searchInvestorsByName(name);
    }

    // 8. Create PitchDeck
    @Post(':companyId/pitchdeck')
    async createPitchDeck(@Param('companyId') companyId: number, @Body() createPitchDeckDto: CreatePitchDeckDto) {
        return this.abService.createPitchDeck(companyId, createPitchDeckDto);
    }

    // 9. Fetch all pitch decks for a company
    @Get(':companyId/pitchdecks')
    async getPitchDecksByCompany(@Param('companyId') companyId: number) {
        return this.abService.getPitchDecksByCompany(companyId);
    }

    // 10. Fetch all investments for a pitch deck
    @Get('pitchdeck/:pitchDeckId/investments')
    async getInvestmentsByPitchDeck(@Param('pitchDeckId') pitchDeckId: number) {
        return this.abService.getInvestmentsByPitchDeck(pitchDeckId);
    }

    // 11. Delete account
    @Delete(':id')
    async deleteCompany(@Param('id') id: number) {
        return this.abService.deleteCompany(id);
    }

    //12. addInvestor

    @Post('investors/add')
    async addInvestor(@Body() createInvestorDto: CreateInvestorDto) {
        return await this.abService.addInvestor(createInvestorDto);
    }

    // 13. Create Investment
    @Post('investment/add')
    async addInvestment(@Body() createInvestmentDto: CreateInvestmentDto) {
        return await this.abService.addInvestment(createInvestmentDto);
    }

}
