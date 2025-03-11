"use client"
import React, { useState } from "react";
import { DataTableDemo } from "@/components/DatatablePaises";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CovidStatsCard } from "@/components/CovidStatsCard";

const Home: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <main className="">
      <div className="grid gap-4">
        <CovidStatsCard date={date} setDate={setDate} />
        <div className="grid grid-cols-[70%_30%] gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Casos de Covid nos estados do Brasil
              </CardTitle>
              <CardDescription>Acompanhe os casos da pandemia nos estados do país.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTableDemo />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Casos de Covid em países
              </CardTitle>
              <CardDescription>Status de casos de Covid em todos os países</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTableDemo />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default Home;
