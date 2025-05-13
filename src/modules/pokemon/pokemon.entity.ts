import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'pokemon' })
// TODO: i might want to define english name of a Pokemon as Unique
export class Pokemon {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nameEnglish: string;

  @Column({ type: 'simple-array' })
  type: string[];

  @Column({ type: 'jsonb' })
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    Speed: number;
  };
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'jsonb' })
  image: {
    sprite: string;
    thumbnail: string;
    hires: string;
  };

  @Column({ type: 'simple-array' })
  weight: number;

  @Column({ type: 'varchar', length: 50 })
  species: string;

  @Column({ type: 'jsonb' })
  profile: {
    height: string;
    weight: string;
    ability: string[][];
  };
}
