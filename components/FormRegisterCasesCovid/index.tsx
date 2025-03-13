"use client"
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { StatesData } from "@/lib/services/statesService";
import { toast } from 'react-toastify';

// Schema de validação dos campos do formulário
const formSchema = z.object({
    name: z.string({ message: "Campo Obrigatório" }).min(2, { message: "Nome é obrigatório" }),
    state: z.string({ message: "Campo Obrigatório" }).nonempty({ message: "Estado é obrigatório" }),
    cases: z.string({ message: "Campo Obrigatório" }),
    confirmed: z.string({ message: "Campo Obrigatório" }),
    deaths: z.string({ message: "Campo Obrigatório" }),
    recovered: z.string({ message: "Campo Obrigatório" }),
    date: z.string({ message: "Campo Obrigatório" }).nonempty({ message: "Data é obrigatória" })
});

// Tipo de dados do Formulário
type FormData = z.infer<typeof formSchema>;

interface FormRegisterCasesCovidProps {
    states: StatesData[] | null;
}

const valuesDefaultRegisterCaseCovid: FormData = {
    name: "",
    state: "",
    cases: "0",
    confirmed: "0",
    deaths: "0",
    recovered: "0",
    date: "",
}

export const FormRegisterCasesCovid: React.FC<FormRegisterCasesCovidProps> = ({ states }) => {
    // Hook do formulário usando React Hook Form
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: valuesDefaultRegisterCaseCovid
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        // Em caso de Api, exemplo:
        /* api.post('/registerCase', data) */
        form.reset(valuesDefaultRegisterCaseCovid);
        toast.success('Dados enviados com sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-medium">
                    Registrar Casos de Covid
                </CardTitle>
                <CardDescription>Preencha os campos abaixo para registrar casos de Covid.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione um estado" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {states && states.map((state) => (
                                                        <SelectItem key={state.uf} value={state.uf}>
                                                            <div className="flex items-center gap-2">
                                                                <Image src={state.flag_url} alt={state.name} width={24} height={16} />
                                                                <span>{state.name}</span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.state?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Data</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cases"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Casos</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmados</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deaths"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mortos</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="recovered"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Recuperados</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="mt-4">Enviar</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
