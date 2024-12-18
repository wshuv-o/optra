import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity()
export class Companies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  market: string;

  @Column({ length: 300 })
  type: string;

  @Column({length:100 , nullable : true})
  growth:string

  @Column({length:60 })
  laaunch_date:string

  @Column({length:200, nullable : true })
  valuation:string

  @Column({length:200, nullable : true})
  funding:string

  @Column({length:100, nullable : true})
  location:string

}

