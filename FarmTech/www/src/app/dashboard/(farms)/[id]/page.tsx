'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import add from "@/public/image/add.png"
import opt from "@/public/image/m0.png"
import Button02 from '../../../components/button02';
import SearchBar from '../../../components/searchBar';

interface List {
    type: string;
    title: string;
    itens: [];
}

export default function Page({ params }: { params: { id: number } }) {

    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const [farm, setFarm] = useState();
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
                const response = await fetch('http://localhost:3000/farms/'+params.id, {
                    method: 'GET',
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

        fetchFarm();
    }, []);

    if (error) {
        return <p className="text-red-500">Erro: {error}</p>;
    }

    console.log(farm.proprietar);

    function handleAddButton(type : string) {
        router.push("/dashboard/"+ type+"_register");
    }

    function handleOptButton() {
        return;
    }

    function handleSearch(searched_farm : string) {
        setSearch(searched_farm);
    }

    return (
        <div>
            <div>
                <div></div>
                <h1>Fazenda</h1>
                <div className="flex flex-col mt-[30px]">
                    <div className="flex flex-inline mb-[25px]">
                        <h1>ID: {farm.id}</h1>
                        <h1 className="ml-[40px] ml-[100px]">{farm.owner} hectares</h1>
                    </div>
                    <div className="flex flex-inline mb-[25px]">
                        <h1>{farm.size} hectares</h1>
                        <h1 className="ml-[40px] ml-[100px]">{farm.local}</h1>
                    </div>
                </div>
            </div>
            <div>
                <h1>{list.title}</h1>
                <div className="flex h-[70px] w-[1000px] mb-[30px] items-center">
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
                    placeholder="Digite o nome da fazenda..."
                    />
                </div>
            </div>
            <div>
                {list.itens.map(e => {
                    return(
                        <Item
                        name={e.title}
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
