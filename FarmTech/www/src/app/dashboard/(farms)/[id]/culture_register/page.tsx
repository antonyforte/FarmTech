'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInputFarm01 from '@/app/components/textInputFarm01';
import NumberInputFarm01 from '@/app/components/numberInputFarm01';
import SelectInput from '@/app/components/selectInputFarm';
import Button01 from '@/app/components/button01';

export default function Page({ params }: { params: { id: number } }) {
    const router = useRouter()

    const [address, setAddress] = useState<string>('');
    const [qtd, setQtd] = useState<number>(0);
    const [message, setMessage] = useState('');
    console.log(params.id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/farms/'+params.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ qtd, local: address}),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            setMessage('Cultura criada com sucesso!');
            router.back()
        } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col h-[520px] w-[1000px] items-center text-3xl text-white bg-neutral-700 pt-[40px] pl-[80px] mt-[80px] ml-[120px]'>
                <h1 className='text-4xl font-bold mb-[40px]'>Nova Cultura</h1>
                <div className='flex flex-col w-[920px]'>
                    <TextInputFarm01
                    text="Endereço:                                                       .. "
                    value={address}
                    handler={(e : React.FormEvent<HTMLInputElement>) => setAddress(e.currentTarget.value)}
                    />
                    <NumberInputFarm01
                    text="Quantidade:"
                    value={qtd}
                    handler={(e : React.FormEvent<HTMLInputElement>) => setQtd(e.currentTarget.valueAsNumber)}
                    />
                </div>
                <Button01 text="Adicionar" path="localhost:3000/farms" />
                {message && <p>{message}</p>}
            </div>
        </form>
    );
}