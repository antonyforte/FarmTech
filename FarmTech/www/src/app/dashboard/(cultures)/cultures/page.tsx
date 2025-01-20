'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import add from "@/public/image/add.png"
import opt from "@/public/image/m0.png"
import Button02 from '@/app/components/button02';
import SearchBar from '../../../components/searchBar';
import Item02 from '../../../components/item02';

export default function Page() {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const [list, setList] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgricultures = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push("/signIn"); // Redireciona para login se não estiver autenticado
                }
                const response = await fetch('http://localhost:3000/agricultures', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                const data = await response.json();
                console.log(data);
                setList(data)
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchAgricultures();
    }, []);

    function handleAddButton(type : string) {
        router.push("/dashboard/cultures/register/"+ type);
    }

    function handleDeleteButton(id : number) {
        setList(
            list.filter(item =>
            item.tipo !== id
            )
        );
    }

    function handleSearch(searched_farm : string) {
        setSearch(searched_farm);
    }

    return (
        <div className='flex flex-col w-screen items-center'>
            <div>
                <div className='flex flex-col mt-[20px] mb-[30px] h-[150px] w-[1000px]'>
                    <div className="flex mt-[30px] items-center">
                        <Button02
                        img = {add}
                        handler = {() => {handleAddButton("harvest")}}
                        />
                        <SearchBar
                        value={search} 
                        handler={(e : React.FormEvent<HTMLInputElement>) => {handleSearch(e.currentTarget.value)}}  
                        type="text" 
                        placeholder="Digite o nome do item..."
                        />
                    </div>
                </div>
                <div className='flex flex-col w-[1200px] bg-neutral-700'>
                    <h1 className='w-[1200px] h-[65px] pt-[15px] text-center text-5xl text-white'>Colheitas</h1>
                    <div className='flex flex-inline'>
                        {list.map(e => {
                            if(!e.colhxanim)
                                return(
                                    <Item02
                                    name={e.nome}
                                    itemId={e.tipo}
                                    handler={() => handleDeleteButton(e.tipo, e.colhxanim)}
                                    type="harvest"
                                    />
                                )
                        })}
                    </div>
                </div>
            </div>
            <div>
                <div className='flex flex-col mt-[20px] mb-[30px] h-[150px] w-[1000px]'>
                    <div className="flex mt-[30px] items-center">
                        <Button02
                        img = {add}
                        handler = {() => {handleAddButton("animal")}}
                        />
                        <SearchBar
                        value={search} 
                        handler={(e : React.FormEvent<HTMLInputElement>) => {handleSearch(e.currentTarget.value)}}  
                        type="text" 
                        placeholder="Digite o nome do item..."
                        />
                    </div>
                </div>
                <div className='flex flex-wrap w-[1200px] bg-neutral-700'>
                    <h1 className='w-[1200px] h-[65px] pt-[15px] text-center text-5xl text-white'>Animais</h1>
                    {list.map(e => {
                        if(e.colhxanim) {
                            return(
                                <Item02
                                name={e.nome}
                                itemId={e.tipo}
                                handler={() => handleDeleteButton(e.tipo, e.colhxanim)}
                                type="animal"
                                />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
}