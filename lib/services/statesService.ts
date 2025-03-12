import axios from "axios";

export interface StatesData {
    uf: string;
    name: string;
    flag_url: string;
    flag_url_rounded: string
    flag_url_square: string
    flag_url_circle: string
}

export async function fetchGetStatesBrazil(): Promise<StatesData[] | null> {
  try {
    const response = await axios.get("https://apis.codante.io/bandeiras-dos-estados");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}