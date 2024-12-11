'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInputFarm01 from '@/app/components/textInputFarm01';
import NumberInputFarm01 from '@/app/components/numberInputFarm01';
import SelectInput from '@/app/components/selectInputFarm';
import Button01 from '@/app/components/button01';

export default function Page({ params }: { params: { id: number } }) {
    const router = useRouter();

    const [proprietar, setProprietar] = useState('');
    const [endereco, setEndereco] = useState('');
    const [tamanho, setTamanho] = useState<number | ''>('');
    const [clima, setClima] = useState('');
    const [message, setMessage] = useState('');

    const climas : string[] = ["Serrado", "Canga"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/farms/edit/'+params.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ proprietar, endereco, tamanho: Number(tamanho), clima }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            setMessage('Fazenda editada com sucesso!');
            router.push("/dashboard")
        } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col h-[550px] w-[1000px] items-center text-3xl text-white bg-neutral-700 pt-[40px] pl-[80px] mt-[80px] ml-[120px]'>
                <h1 className='text-4xl font-bold mb-[40px]'>Editar Fazenda</h1>
                <div className='flex flex-col w-[920px]'>
                    <TextInputFarm01
                    text="Proprietário:"
                    value={proprietar}
                    handler={(e : React.FormEvent<HTMLInputElement>) => setProprietar(e.currentTarget.value)}
                    />
                    <TextInputFarm01
                    text="Endereço:                                                       .. "
                    value={endereco}
                    handler={(e : React.FormEvent<HTMLInputElement>) => setEndereco(e.currentTarget.value)}
                    />
                    <div className='flex flex-inline'>
                        <NumberInputFarm01
                        text="Tamanho (hectares)"
                        value={tamanho}
                        handler={(e : React.FormEvent<HTMLInputElement>) => setTamanho(e.currentTarget.valueAsNumber)}
                        />
                        <SelectInput
                        text="Clima"
                        value={clima}
                        options={climas}
                        handler={(e : React.FormEvent<HTMLInputElement>) => setClima(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <Button01 text="Adicionar" path="#" />
                {message && <p>{message}</p>}
            </div>
        </form>
    );
}
