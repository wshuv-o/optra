import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Investment } from "./ab.entity";

@Entity()
export class Investor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  full_name: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column({ length: 100, nullable: true })
  company_name: string;

  @Column({ length: 15, nullable: true })
  phone_number: string;

  @Column({ length: 100, nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  gender: string;

  @Column({ length: 60, nullable: true }) 
  launch_date: string;

  @Column({ length: 100, nullable: true })
  net_worth: string;

  @Column({ length: 100, nullable: true })
  company_type: string;

  @OneToMany(() => Investment, (investment) => investment.investor)
  investments: Investment[];
}
