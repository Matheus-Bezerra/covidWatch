"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Trash } from "lucide-react";

interface CovidStatsCardProps {
    data: {
        confirmed: number | null;
        deaths: number | null;
        recovered: number | null;
    };
}

export const CovidStatsCard: React.FC<CovidStatsCardProps> = ({ data }) => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    const formatNumber = (number: number | null) => {
        if (number === null || number === undefined) {
            return "-";
        }
        return new Intl.NumberFormat('pt-BR').format(number);
    };

    return (
        <Card>
            <CardHeader>
                <div className="space-y-5 flex justify-between">
                    <div>
                        <CardTitle className="text-base font-medium">
                            Casos de Covid no Brasil
                        </CardTitle>
                        <CardDescription>Acompanhe os casos da pandemia no país.</CardDescription>
                    </div>
                    <div className="flex gap-1">
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
                                    onSelect={(newDate) => {
                                        setDate(newDate)
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <Button variant={"outline"} size={"icon"}>
                            <Trash />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-8 justify-between">
                    <div>
                        <div className="flex gap-1.5 items-center">
                            <p className="text-muted-foreground">Casos Confirmados</p>
                            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                        </div>
                        <h2 className="text-xl font-bod">{formatNumber(data.confirmed)}</h2>
                    </div>
                    <div>
                        <div className="flex gap-1.5 items-center">
                            <p className="text-muted-foreground">Casos Suspeitos</p>
                            <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                        </div>
                        <h2 className="text-xl font-bod">{formatNumber(data.recovered)}</h2>
                    </div>
                    <div>
                        <div className="flex gap-1.5 items-center">
                            <p className="text-muted-foreground">Óbitos Confirmados</p>
                            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                        </div>
                        <h2 className="text-xl font-bod">{formatNumber(data.deaths)}</h2>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
