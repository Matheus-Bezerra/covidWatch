import { useState } from "react";
import { CovidData, fetchCovidData, fetchCovidDataWithDate } from "@/lib/services/covidService";

export const useCovidData = (initialData: CovidData) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [covidData, setCovidData] = useState<CovidData>(initialData);

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

    return { date, covidData, handleDateChange };
};
