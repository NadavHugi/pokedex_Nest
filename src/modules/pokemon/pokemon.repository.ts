import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonRepository {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  async findOneByID(id: number): Promise<Pokemon | null> {
    console.log('Repository:', id);
    return this.pokemonRepository.findOneBy({ id });
  }
  //this is for seed
  async create(data: DeepPartial<Pokemon>): Promise<Pokemon> {
    const entity = this.pokemonRepository.create(data);
    return this.pokemonRepository.save(entity);
  }
}
