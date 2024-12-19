'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import add from "@/public/image/add.png"
import opt from "@/public/image/m0.png"
import Button02 from '../../../components/button02';
import SearchBar from '../../../components/searchBar';
import Item from '../../../components/item';

interface List {
    type: string;
    title: string;
    itens: [];
}

export default function Page({ params }: { params: { id: number } }) {

    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const [farm, setFarm] = useState<any>();
    const [list, setList] = useState<List>({
        type: "culture",
        title: "Cultura",
        itens: [],
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarm = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push("/signIn"); // Redireciona para login se não estiver autenticado
                }
                const response = await fetch("http://localhost:3000/farms/unique/7", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                const data = await response.json();
                setFarm(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        const fetchCultures = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push("/signIn"); // Redireciona para login se não estiver autenticado
                }
                const response = await fetch('http://localhost:3000/farms/'+params.id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                const data = await response.json();
                setList({...list, itens: data});
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchCultures();
        fetchFarm();
    }, []);

    if (error) {
        return <p className="text-red-500">Erro: {error}</p>;
    }

    console.log(farm);

    function handleAddButton(type : string) {
        router.push("/dashboard/"+ params.id+ "/" + type+"_register");
    }

    function handleBack() {
        router.back();
    }

    function handleEdit() {
        const path : string = '/dashboard/edit/' + params.id;
        router.push(path);
    }


    function handleOptButton() {
        return;
    }

    function handleSearch(searched_farm : string) {
        setSearch(searched_farm);
    }

    return (
        <div className='flex flex-col w-screen items-center'>
            <div className='flex flex-col w-[81vw] h-[30vh] bg-neutral-700 text-white'>
                <div className='flex flex-inline pt-[20px] pl-[20px] pr-[30px] w-[81vw] justify-between'>
                    <button onClick= {() => handleBack()} className='h-[50px] pl-[20px] pr-[20px] bg-blue-400 border-[1px] border-slate-700 rounded-md text-[18px]'>Voltar</button>
                    <div className='flex'>
                        <button onClick={() => handleEdit()} className='h-[50px] pl-[20px] pr-[20px] bg-yellow-400 border-[1px] border-slate-700 rounded-md text-[18px]'>Editar Fazenda</button>
                        <button className='h-[50px] pl-[20px] pr-[20px] ml-[20px] bg-red-400 border-[1px] border-slate-700 rounded-md text-[18px]'>Deletar Fazenda</button>
                    </div>
                </div>
                <h1 className='text-5xl w-[81vw] text-center'>Fazenda</h1>
                <div className="flex flex-col pl-[30px] mt-[30px]">
                    <div className="flex flex-inline mb-[25px]">
                        <h1>ID: {farm.id}</h1>
                        <h1 className="ml-[40px] ml-[100px]">{farm.proprietar}</h1>
                    </div>
                    <div className="flex flex-inline mb-[25px]">
                        <h1>{farm.tamanho} hectares</h1>
                        <h1 className="ml-[40px] ml-[100px]">{farm.endereco}</h1>
                    </div>
                </div>
            </div>
            <div className='flex flex-col mt-[20px] mb-[30px] h-[150px] w-[1000px]'>
                <div className='flex flex-wrap w-[925px] justify-between'>
                    <button className='h-[50px] pl-[20px] pr-[20px] bg-yellow-400 border-[1px] border-slate-700 rounded-md text-[18px]'>Calcular Necessidades</button>
                    <button className='h-[50px] pl-[20px] pr-[20px] bg-yellow-400 border-[1px] border-slate-700 rounded-md text-[18px]'>Listagem de Agropecuária</button>
                </div>
                <div className="flex mt-[30px] items-center">
                    <Button02
                    img = {add}
                    handler = {() => {handleAddButton(list.type)}}
                    />
                    <Button02
                    img = {opt}
                    handler = {() => {handleOptButton()}}
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
                <h1 className='w-[1200px] h-[65px] pt-[15px] text-center text-5xl text-white'>{list.title}</h1>
                {list.itens.map(e => {
                    return(
                        <Item
                        name={list.title}
                        itemId={e.id}
                        farmId={params.id}
                        type={list.type}
                        />
                    )
                })}
            </div>
        </div>
    );
}
