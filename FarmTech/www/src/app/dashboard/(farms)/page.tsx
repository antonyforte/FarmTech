'use client';

import add from "@/public/image/add.png"
import opt from "@/public/image/m0.png"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button02 from "@/app/components/button02";
import SearchBar from "@/app/components/searchBar";
import Farm from "@/app/components/farm";

export default function Page() {
    const router = useRouter();
    const [farms, setFarms] = useState([]);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push("/signIn"); // Redireciona para login se não estiver autenticado
                }
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
                setList(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchFarms();
    }, []);


    function handleAddButton() {
        router.push("/dashboard/register");
    }

    function handleDeleteButton(id : number) {
        setFarms(
            farms.filter(item =>
              item.id !== id
            )
        );
    }

    function handleSearch(e : string) {
        setSearch(e);
        setList(farms.filter(farm => (farm.proprietar.toLowerCase().includes(e.toLowerCase()) || farm.endereco.toLowerCase().includes(e.toLowerCase()))));
    }

    function handleAgroList() {
        const path : string = '/dashboard/ranking';
        router.push(path);
    }


    return (
        <div className="flex flex-col ml-[104px] pt-[40px]">
            <div className="flex h-[70px] w-[1000px] items-center">
                <Button02
                img = {add}
                handler = {() => {handleAddButton()}}
                />
                <SearchBar
                value={search} 
                handler01={(e : React.FormEvent<HTMLInputElement>) => {handleSearch(String(e.currentTarget.value))}}  
                type="text" 
                placeholder="Digite o nome da fazenda..."
                />
                <button onClick={() => handleAgroList()} className='h-[50px] ml-[20px] pl-[20px] pr-[20px] bg-yellow-400 border-[1px] border-slate-700 rounded-md text-[15px]'>Listagem de Agropecuária</button>
            </div>
            <div className="flex flex-col mt-[50px]">
                {list.map(e => {
                        return(
                            <Farm
                            id={e.id}
                            name="Fazenda"
                            handler={() => handleDeleteButton(e.id)}
                            owner={e.proprietar}
                            size={e.tamanho}
                            local={e.endereco}
                            />
                        );
                    })}
            </div>
        </div>
    );
}