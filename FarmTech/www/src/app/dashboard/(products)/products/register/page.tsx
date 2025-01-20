'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInputFarm01 from '@/app/components/textInputFarm01';
import NumberInputFarm01 from '@/app/components/numberInputFarm01';
import SelectInput from '@/app/components/selectInputFarm';
import Button01 from '@/app/components/button01';

export default function Page() {
    const router = useRouter()

    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nome: name, preco: Number(price)}),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            setMessage('Produto Cadastrado!');
            router.push("/dashboard/products")
        } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col h-[520px] w-[1000px] items-center text-3xl text-white bg-neutral-700 pt-[40px] pl-[80px] mt-[80px]'>
                <h1 className='text-4xl font-bold mb-[40px]'>Novo Produto</h1>
                <div className='flex flex-col w-[920px]'>
                    <TextInputFarm01
                    text="Nome:"
                    value={name}
                    handler={(e : React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                    />
                    <NumberInputFarm01
                        text="Preço"
                        value={price}
                        handler={(e : React.FormEvent<HTMLInputElement>) => setPrice(e.currentTarget.valueAsNumber)}
                    />
                </div>
                <Button01 text="Adicionar" path="localhost:3000/farms" />
                {message && <p>{message}</p>}
            </div>
        </form>
    );
}
