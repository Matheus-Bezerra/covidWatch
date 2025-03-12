import React from 'react';
import { FormRegisterCasesCovid } from '@/components/FormRegisterCasesCovid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CovidCharts } from '@/components/CovidCharts';
import { fetchGetStatesBrazil } from '@/lib/services/statesService';

const RegistrarPage = async () => {
    const states = await fetchGetStatesBrazil()

    return (
        <div className="container mx-auto p-4">
            <div className="grid lg:grid-cols-[60%_40%] gap-4">
                <FormRegisterCasesCovid states={states} />
                <Card className='hidden lg:flex'>
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
            </div>
        </div>
    );
};

export default RegistrarPage;