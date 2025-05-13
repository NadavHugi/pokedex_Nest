import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';
@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get()
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }
  @Get(':id')
  findOneByID(@Param('id') id: number) {
    console.log('controller:', id);
    return this.pokemonService.findOneByID(id);
  }
}
