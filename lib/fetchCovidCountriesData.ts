import { api } from "./api";

export interface CountryData {
  country: string;
  confirmed: number;
  deaths: number;
  suspects: number;
}

interface ApiResponse {
  data: CountryData[];
}

export async function fetchCovidCountriesData(): Promise<CountryData[]> {
  try {
    const response = await api.get<ApiResponse>("report/v1/countries");
    return response.data.data.map((country) => ({
      country: country.country,
      confirmed: country.confirmed,
      deaths: country.deaths,
      suspects: country.suspects,
    }));
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return [];
  }
}
