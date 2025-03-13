import { api } from "@/lib/api/api";

// Tipagem da estatisticas do Covid em relação ao Brasil
export interface CovidData {
  confirmed: number | null;
  deaths: number | null;
  recovered: number | null;
}

// Tipagem dos dados de Covid por estado
export interface CovidStateData {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string;
}

// Tipagem dos dados de Covid por país
export interface CountryData {
  country: string;
  confirmed: number;
  deaths: number;
  suspects: number;
}

// Tipagem da resposta da API de Covid por país
interface ApiCovidCountryResponse {
  data: CountryData[];
}

// Função para buscar os dados de Covid no Brasil
export async function fetchCovidData(): Promise<CovidData | null> {
  try {
    const response = await api.get("report/v1/brazil");
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}

// Função para buscar os dados de Covid no Brasil em relação a uma data específica
export async function fetchCovidDataWithDate(date: string): Promise<CovidData | null> {
  try {
    const response = await api.get(`report/v1/brazil/${date}`);
    const data: CovidStateData[] = response.data.data;

    const confirmed = data.reduce((sum: number, state: CovidStateData) => sum + state.cases, 0);
    const deaths = data.reduce((sum: number, state: CovidStateData) => sum + state.deaths, 0);
    const recovered = data.reduce((sum: number, state: CovidStateData) => sum + state.suspects, 0);

    return { confirmed, deaths, recovered };
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}

// Função para buscar os dados de Covid por estado
export async function fetchCovidStates(): Promise<CovidStateData[]> {
  try {
    const response = await api.get("/report/v1");
    return response.data.data.map((state: CovidStateData) => ({
      uf: state.uf,
      state: state.state,
      cases: state.cases,
      deaths: state.deaths,
      suspects: state.suspects,
    }));
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return [];
  }
}

// Função para buscar os dados de Covid por país
export async function fetchCovidCountriesData(): Promise<CountryData[]> {
  try {
    const response = await api.get<ApiCovidCountryResponse>("report/v1/countries");
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
