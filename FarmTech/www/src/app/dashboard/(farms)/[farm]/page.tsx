'use client';

import { useEffect, useState } from 'react';

export default function Page(params) {
    const index = parseInt(params.id);
    const [farms, setFarms] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/farms', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                const data = await response.json();
                setFarms(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchFarms();
    }, []);

    if (error) {
        return <p className="text-red-500">Erro: {error}</p>;
    }

    return (
        <div>
            <h1>Minhas Fazendas</h1>
            <ul>
                {farms.map((farm: any) => (
                    <li key={farm.id}>
                        <h2>{farm.proprietar}</h2>
                        <p>Endereço: {farm.endereco}</p>
                        <p>Tamanho: {farm.tamanho} hectares</p>
                        <p>Clima: {farm.clima}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
