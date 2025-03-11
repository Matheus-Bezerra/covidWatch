"use client"
import React, { useEffect, useState } from "react";
import { fetchCovidStates, StateData } from "@/lib/fetchCovidBrazilData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const CovidCharts: React.FC = () => {
    const [statesData, setStatesData] = useState<StateData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCovidStates();
            setStatesData(data);
        };
        fetchData();
    }, []);

    console.log("sStates data ", statesData)

    return (
        <div style={{ width: '100%', height: 300, overflowY: 'auto' }}>
            <ResponsiveContainer width="100%" height={statesData.length * 50}>
                <BarChart
                    data={statesData.map((state, index) => ({ ...state, key: `${state.uf}-${index}` }))}
                    layout="vertical" // Deixa o gráfico horizontal
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }} // Increase left margin to accommodate longer state names
                >
                    <XAxis type="number" />
                    <YAxis dataKey="uf" type="category" width={100} /> {/* Increase width to accommodate longer state names */}
                    <Tooltip />
                    <Bar dataKey="cases" fill="#4CAF50" name="Casos Confirmados" /> {/* Use a more visually appealing color */}
                    <Bar dataKey="deaths" fill="#F44336" name="Mortes" /> {/* Use a more visually appealing color */}
                    <Bar dataKey="suspects" fill="#FFEB3B" name="Casos Suspeitos" /> {/* Use a more visually appealing color */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
