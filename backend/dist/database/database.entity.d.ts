import { Investor } from './investor.entity';
export declare class Companies {
    id: number;
    name: string;
    email: string;
    password: string;
    market: string;
    type: string;
    growth: string;
    launch_date: string;
    pitchDecks: PitchDeck[];
    investments: Investment[];
}
export declare class PitchDeck {
    id: number;
    company: Companies;
    valuation: string;
    funding: string;
    markup: string;
    pitch_date: string;
}
export declare class Investment {
    id: number;
    investor: Investor;
    company: Companies;
    amount_invested: number;
    investment_date: string;
    comments: string;
}
