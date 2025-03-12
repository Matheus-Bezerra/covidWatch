import React from "react";
import { DataTablePaises } from "@/components/DatatablePaises";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CovidStatsCard } from "@/components/CovidStatsCard";
import { fetchCovidData } from "@/lib/fetchCovidBrazilData";
import { CovidCharts } from "@/components/CovidCharts";
import { fetchCovidCountriesData } from "@/lib/fetchCovidCountriesData";

export default async function Home() {
  const data = await fetchCovidData() || { confirmed: null, deaths: null, recovered: null };
  const countriesData = await fetchCovidCountriesData();

  return (
    <main className="">
      <div className="grid gap-4">
        <CovidStatsCard data={data} />
        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Casos de Covid nos estados do Brasil
              </CardTitle>
              <CardDescription>Acompanhe os casos da pandemia nos estados do país.</CardDescription>
            </CardHeader>
            <CardContent>
              <CovidCharts />
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
              <DataTablePaises data={countriesData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}