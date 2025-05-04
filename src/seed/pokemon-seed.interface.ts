export interface PokemonSeedRaw {
  id: number;
  name: { english: string };
  type: string[];
  base: { HP: number; Attack: number; Defense: number; Speed: number };
  description: string;
  image: { sprite: string; thumbnail: string; hires: string };
  profile: { height: string; weight: string; ability: string[][] };
  species: string;
}
