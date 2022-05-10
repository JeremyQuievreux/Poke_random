import mongoose from 'mongoose';

// Document interface
interface IPokemon {
    gen: number;
    dex_number: number;
    name: string;
    type: string[];
    description: string;
    picURL: string;
    price: number;
    height: number;
    weight: number;
}

// Schema
const PokemonSchema = new mongoose.Schema<IPokemon>({
    gen: {type: Number, required: true},
    dex_number: {type: Number, required: true},
    name: {type: String, required: true},
    type: {type: [String], required: true},
    description: {type: String, required: false, default: ""},
    picURL: {type: String, required: true},
    price: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
});

// 3. Create a Model.
const PokemonModel = mongoose.models.pokemons || mongoose.model<IPokemon>('pokemon', PokemonSchema);

export default PokemonModel;