// src/modules/pokemon/pokemon.repository.ts
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
    return this.pokemonRepository.findOneBy({ id });
  }

  // ← add this method if you want to seed/create
  async create(data: DeepPartial<Pokemon>): Promise<Pokemon> {
    const entity = this.pokemonRepository.create(data);
    return this.pokemonRepository.save(entity);
  }
}
