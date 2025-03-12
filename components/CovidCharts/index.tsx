"use client"
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { Input } from "@/components/ui/input";
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { fetchCovidStates, StateData } from "@/lib/services/covidService";

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background p-2 border border-gray-300 rounded shadow-lg">
                <p className="label">{label}</p>
                {payload.map((entry, index) => (
                    <div key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {new Intl.NumberFormat("pt-BR").format(entry.value as number)}
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export const CovidCharts: React.FC = () => {
    const [statesData, setStatesData] = useState<StateData[]>([]);
    const [filteredData, setFilteredData] = useState<StateData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCovidStates();
            setStatesData(data);
            setFilteredData(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const trimmedQuery = searchQuery.trim().toLowerCase();
        const filtered = statesData.filter(state =>
            state.uf.toLowerCase().includes(trimmedQuery) ||
            state.state.toLowerCase().includes(trimmedQuery)
        );
        setFilteredData(filtered);
    }, [searchQuery, statesData]);

    return (
        <div className="w-full h-96 overflow-y-auto pr-3">
            <Input
                placeholder="Procurar estado por sigla ou nome"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
            />
            <ResponsiveContainer width="100%" height={Math.max(filteredData.length * 50, 300)}>
                <BarChart
                    data={filteredData.map((state, index) => ({ ...state, key: `${state.uf}-${index}` }))}
                    layout="vertical"
                    margin={{ top: 20, right: 40, bottom: 5 }}
                >
                    <XAxis type="number" scale="log" domain={['auto', 'auto']} />
                    <YAxis dataKey="uf" type="category" width={100} />
                    <Tooltip content={<CustomTooltip />} cursor={false} /> {/* Disable cursor background fill */}
                    <Bar dataKey="cases" fill="#22c55e" name="Casos Confirmados" radius={[6, 6, 6, 6]} />
                    <Bar dataKey="deaths" fill="#ef4444" name="Mortes" radius={[6, 6, 6, 6]} />
                    <Bar dataKey="suspects" fill="#eab308" name="Casos Suspeitos" radius={[6, 6, 6, 6]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
