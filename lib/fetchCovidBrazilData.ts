import { api } from "./api";

export interface CovidData {
  confirmed: number | null;
  deaths: number | null;
  recovered: number | null;
}

export interface StateData {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string;
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

export async function fetchCovidDataWithDate(date: string): Promise<CovidData | null> {
  try {
    const response = await api.get(`report/v1/brazil/${date}`);
    const data: StateData[] = response.data.data;

    const confirmed = data.reduce((sum: number, state: StateData) => sum + state.cases, 0);
    const deaths = data.reduce((sum: number, state: StateData) => sum + state.deaths, 0);
    const recovered = data.reduce((sum: number, state: StateData) => sum + state.suspects, 0);

    return { confirmed, deaths, recovered };
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}

export async function fetchCovidStates(): Promise<StateData[]> {
  try {
    const response = await api.get("/report/v1");
    return response.data.data.map((state: StateData) => ({
      uf: state.uf,
      cases: state.cases,
      deaths: state.deaths,
      suspects: state.suspects,
    }));
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return [];
  }
}