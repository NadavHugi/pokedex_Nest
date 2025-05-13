import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { PokemonRepository } from './pokemon.repository';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  providers: [PokemonRepository, PokemonService],
  controllers: [PokemonController],
  exports: [PokemonRepository, PokemonService],
})
export class PokemonModule {}
