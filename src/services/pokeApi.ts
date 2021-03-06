import axios from "axios";

interface PokemonFilteredListProps {
    pokemon_species: [{
        name: string;
        url: string;
    }]
}

const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2/"
});

export async function getPokemonList() {
    try {
        const res = await api.get(`/pokemon?limit=151&offset=0`);

        return res.data.results;
    } catch (error) {
        return false;
    }
};

export async function getPokemon(pokemonId: number | string) {
    try {
        const res = await api.get(`/pokemon/${pokemonId}`);

        return res.data;
    } catch (error) {
        return false;
    }
};

export async function getTypeInfo(typeId: number | string) {
    try {
        const res = await api.get(`/type/${typeId}`);

        return res.data.pokemon;
    } catch (error) {
        return false;
    }
};

export async function getGenInfo(genId: string | null) {
    try {
        if(!genId) {
            const res = await api.get("/generation/");
            return res.data.results;
        }

        const res = await api.get(`/generation/${genId}`);

        return res.data.pokemon_species;
    } catch (error) {
        return false;
    }
};