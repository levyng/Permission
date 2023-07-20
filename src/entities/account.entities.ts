import { 
  Entity, 
  PrimaryGeneratedColumn,
  Column
 } from "typeorm";

@Entity({name: 'account'})
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  type: number = 1;

  @Column()
  name: string = null;

  @Column()
  email: string = "";
}
