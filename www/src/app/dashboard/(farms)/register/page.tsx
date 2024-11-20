'use client';

import { useState } from 'react';

export default function Page() {
    const [proprietar, setProprietar] = useState('');
    const [endereco, setEndereco] = useState('');
    const [tamanho, setTamanho] = useState<number | ''>('');
    const [clima, setClima] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/farms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ proprietar, endereco, tamanho: Number(tamanho), clima }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            setMessage('Fazenda criada com sucesso!');
            setProprietar('');
            setEndereco('');
            setTamanho('');
            setClima('');
        } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Nova Fazenda</h1>
            <input
                type="text"
                placeholder="Proprietário"
                value={proprietar}
                onChange={(e) => setProprietar(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Tamanho (hectares)"
                value={tamanho}
                onChange={(e) => setTamanho(e.target.valueAsNumber)}
                required
            />
            <input
                type="text"
                placeholder="Clima"
                value={clima}
                onChange={(e) => setClima(e.target.value)}
                required
            />
            <button type="submit">Criar</button>
            {message && <p>{message}</p>}
        </form>
    );
}
