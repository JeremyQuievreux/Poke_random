export type PokemonType = {
    _id: string;
    gen: number;
    dex_number: number;
    name: string;
    type: string[];
    description: string;
    picURL: string;
    price: number;
    height: number;
    weight: number;
    rarity: string;
}