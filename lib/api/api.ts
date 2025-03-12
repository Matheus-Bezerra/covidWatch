// lib/api.ts
import axios from "axios";

// Geralmente fica em um arquivo ENV, mas como é um projeto com api pública resolvi deixar aqui
export const API_BASE_URL = "https://covid19-brazil-api.now.sh";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
});
