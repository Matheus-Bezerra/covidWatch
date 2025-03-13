"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import StatItem from "./StatItem";
import { CovidData } from "@/lib/services/covidService";
import { useCovidData } from "@/hooks/useCovidData";

interface CovidStatsCardProps {
    data: CovidData;
}

export const CovidStatsCard: React.FC<CovidStatsCardProps> = ({ data }) => {
    // Hook que gerencia os dados do Covid do Brasil de acordo com a data ou sem a data
    const { date, covidData, handleDateChange } = useCovidData(data);

    return (
        <Card>
            <CardHeader>
                <div className="space-y-5 flex flex-wrap gap-x-6 justify-between">
                    <div>
                        <CardTitle className="text-base font-medium">
                            Casos de Covid no Brasil
                        </CardTitle>
                        <CardDescription>Acompanhe os casos da pandemia no país.</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {/* Popover que abre o calendário para selecionar a data */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Selecione uma data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateChange}
                                    initialFocus
                                    locale={ptBR}
                                    defaultMonth={new Date(2023, 2)} // Visualização inicial do calendário de Março de 2023 onde tem mais dados disponíveis
                                />
                            </PopoverContent>
                        </Popover>
                        {/* Botão para limpar a data, junto com o tooltip que aparece quando passa o mouse sobre o botão */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant={"outline"} size={"icon"} onClick={() => handleDateChange(undefined)} className="cursor-pointer">
                                        <Trash />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Limpar data</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid md:flex md:justify-between gap-8 justify-between">
                    <StatItem label="Casos Confirmados" value={covidData.confirmed} className="bg-green-500" />
                    <StatItem label="Casos Suspeitos" value={covidData.recovered} className="bg-yellow-500" />
                    <StatItem label="Óbitos Confirmados" value={covidData.deaths} className="bg-red-500" />
                </div>
            </CardContent>
        </Card >
    );
}
