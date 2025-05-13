import { DeepPartial } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PokemonRepository } from './pokemon.repository';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(private pokemonRepository: PokemonRepository) {}

  async create(data: DeepPartial<Pokemon>): Promise<Pokemon> {
    return this.pokemonRepository.create(data);
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.findAll();
  }

  async findOneByID(id: number): Promise<Pokemon | null> {
    console.log('service:', id);
    return this.pokemonRepository.findOneByID(id);
  }
}
