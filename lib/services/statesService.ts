import axios from "axios";

// Tipagem dos dados de estados
export interface StatesData {
    uf: string;
    name: string;
    flag_url: string;
    flag_url_rounded: string
    flag_url_square: string
    flag_url_circle: string
}

// Função para buscar os dados dos estados do Brasil
export async function fetchGetStatesBrazil(): Promise<StatesData[] | null> {
  try {
    const response = await axios.get("https://apis.codante.io/bandeiras-dos-estados");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}