import { api } from "./api";

export interface CovidData {
  confirmed: number | null;
  deaths: number | null;
  recovered: number | null;
}

export async function fetchCovidData(): Promise<CovidData | null> {
  try {
    const response = await api.get("report/v1/brazil");
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}