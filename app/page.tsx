import { DataTableCountries } from "@/components/DatatableCountries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CovidStatsCard } from "@/components/CovidStatsCard";
import { CovidCharts } from "@/components/CovidCharts";
import { fetchCovidCountriesData, fetchCovidData } from "@/lib/services/covidService";

export default async function Home() {
  const data = await fetchCovidData() || { confirmed: null, deaths: null, recovered: null };
  const countriesData = await fetchCovidCountriesData();

  return (
    <div className="grid gap-4">
      <CovidStatsCard data={data} />
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Casos de Covid nos estados do Brasil
            </CardTitle>
            <CardDescription>Acompanhe a situação da pandemia em cada estado Brasileiro</CardDescription>
          </CardHeader>
          <CardContent>
            <CovidCharts />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Casos de Covid pelo mundo
            </CardTitle>
            <CardDescription>Acompanhe a situação da pandemia em diferentes países</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTableCountries data={countriesData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}