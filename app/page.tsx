"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import React from "react";

export default function Home() {

  const [date, setDate] = React.useState<Date>()

  return (
    <main className="">
      <Card>
        <CardHeader>
          <div className="space-y-5 flex justify-between items-center">
            <div>
              <CardTitle className="text-base font-medium">
                Casos de Covid no Brasil
              </CardTitle>
              <CardDescription>Acompanhe os casos da pandemia no país.</CardDescription>
            </div>
            <div>
              <Tabs defaultValue="account" className="">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Auge</TabsTrigger>
                  <TabsTrigger value="password">Hoje</TabsTrigger>
                  <div className="h-2 data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
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
                          {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </TabsList>
              </Tabs>
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
              <h2 className="text-xl font-bod">384.000</h2>
            </div>
            <div>
              <div className="flex gap-1.5 items-center">
                <p className="text-muted-foreground">Casos Suspeitos</p>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              </div>
              <h2 className="text-xl font-bod">384.000</h2>
            </div>
            <div>
              <div className="flex gap-1.5 items-center">
                <p className="text-muted-foreground">Óbitos Confirmados</p>
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              </div>
              <h2 className="text-xl font-bod">384.000</h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </main >
  );
}
