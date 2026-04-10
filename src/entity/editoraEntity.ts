import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
  name: "editoras",
})
export default class {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;

  constructor(id: number, nome: string) {
    this.nome = nome;
  }
}
