import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (number: number | null) => {
  if (number === null || number === undefined) {
    return "-";
  }
  return new Intl.NumberFormat('pt-BR').format(number);
};
