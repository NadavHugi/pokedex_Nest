import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PokemonRepository } from '../modules/pokemon/pokemon.repository';
import { PokemonSeedRaw } from './pokemon-seed.interface';
import { Pokemon } from '../modules/pokemon/pokemon.entity';
import * as fs from 'fs/promises';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const repo = app.get(PokemonRepository);

  const rawText = await fs.readFile(join(__dirname, 'pokemon.json'), 'utf-8');
  const data = JSON.parse(rawText) as PokemonSeedRaw[];

  const validData = data.filter((item, idx) => {
    const ok = item.base && typeof item.base.HP === 'number';
    if (!ok) {
      console.warn(
        `Skipping entry ${idx} (id=${item.id}) — missing or invalid base`,
      );
    }
    return ok;
  });

  const pokemons: Pokemon[] = validData.map((item) => ({
    id: item.id,
    nameEnglish: item.name.english,
    type: item.type,
    base: {
      HP: item.base.HP,
      Attack: item.base.Attack,
      Defense: item.base.Defense,
      Speed: item.base.Speed,
    },
    description: item.description,
    image: {
      sprite: item.image.sprite,
      thumbnail: item.image.thumbnail,
      hires: item.image.hires,
    },
    weight: parseFloat(item.profile.weight),
    species: item.species,
    profile: {
      height: item.profile.height,
      weight: item.profile.weight,
      ability: item.profile.ability,
    },
  }));

  for (const p of pokemons) {
    try {
      await repo.create(p);
    } catch (err: unknown) {
      console.error(
        `Failed to insert Pokémon #${p.id}:`,
        (err as Error).message,
      );
    }
  }

  await app.close();
}

void bootstrap();
