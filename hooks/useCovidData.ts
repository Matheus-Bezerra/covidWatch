import { useState } from "react";
import { CovidData, fetchCovidData, fetchCovidDataWithDate } from "@/lib/services/covidService";

export const useCovidData = (initialData: CovidData) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [covidData, setCovidData] = useState<CovidData>(initialData);

    // Função que é chamada quando a data é alterada
    const handleDateChange = async (newDate: Date | undefined) => {
        setDate(newDate);
        if (newDate) {
            const formattedDate = newDate.toISOString().split('T')[0].replace(/-/g, '');
            const newData = await fetchCovidDataWithDate(formattedDate);
            if (newData) {
                setCovidData(newData);
            }
        } else {
            const initialData = await fetchCovidData();
            if (initialData) {
                setCovidData(initialData);
            }
        }
    };

    // Retorna a data, dados do covid do Brasil em relação a data em caso de valor e a função para monitorar a alteração da data
    return { date, covidData, handleDateChange };
};
