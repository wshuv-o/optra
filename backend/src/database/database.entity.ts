import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Investor } from './investor.entity';
@Entity()
export class Companies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 500, nullable: true })
  profile_pic: string;

  @Column({ length: 500, nullable: true })
  market: string;

  @Column({ length: 300, nullable: true })
  type: string;

  @Column({ length: 100, nullable: true })
  growth: string;

  @Column({ length: 60, nullable: true })
  launch_date: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', nullable: true })
  companySocials: string;

  @Column({ length: 500, nullable: true })
  companyName: string;

  @Column({ length: 100, nullable: true })
  registrationNumber: string;

  @Column({ length: 200, nullable: true })
  industry: string;

  @Column({ length: 300, nullable: true })
  companyEmail: string;

  @Column({ length: 50, nullable: true })
  companyPhone: string;

  @Column({ length: 300, nullable: true })
  companyWebsite: string;

  @Column({ length: 300, nullable: true })
  street: string;

  @Column({ length: 200, nullable: true })
  city: string;

  @Column({ length: 200, nullable: true })
  state: string;

  @Column({ length: 20, nullable: true })
  zip: string;

  @Column({ length: 200, nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  companyDescription: string;

  @Column({type: "text", nullable:true })
  doc: string;

  @OneToMany(() => PitchDeck, (pitchDeck) => pitchDeck.company)
  pitchDecks: PitchDeck[];

  @OneToMany(() => Investment, (investment) => investment.company)
  investments: Investment[];
}


@Entity()
export class PitchDeck {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Companies, (company) => company.pitchDecks, { onDelete: 'CASCADE' })
  company: Companies;

  @Column({ length: 200, nullable: true })
  valuation: string;

  @Column({ length: 200, nullable: true })
  funding: string;

  @Column({ length: 20000, nullable: true })
  markup: string;

  @Column({ length: 200, nullable: true })
  pitch_date: string;
}

@Entity()
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Investor, (investor) => investor.investments, { onDelete: 'CASCADE' })
  investor: Investor;

  @ManyToOne(() => Companies, (company) => company.investments, { onDelete: 'CASCADE' })
  company: Companies;

  @Column('float')
  amount_invested: number;

  @Column({ length: 200, nullable: true })
  investment_date: string;

  @Column({ length: 500, nullable: true })
  comments: string;
}


