'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import add from "@/public/image/add.png"
import opt from "@/public/image/m0.png"
import Button02 from '../../../components/button02';
import SearchBar from '../../../components/searchBar';
import Item02 from '../../../components/item02';

interface List {
    title: string;
    type: string;
    itens: [];
}

export default function Page() {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const [harvestList, setHaverstList] = useState<List>({
        title: "Colheita",
        type: "harvest",
        itens: [],
    });
    const [animalList, setAnimaltList] = useState<List>({
        title: "Animal",
        type: "animal",
        itens: [],
    });
    const [error, setError] = useState<string | null>(null);


    function handleAddButton(type : string) {
        router.push("/dashboard/cultures/register/"+ type);
    }

    function handleBack() {
        router.back();
    }

    function handleEdit(type : string, id : number) {
        const path : string = '/dashboard/cultures/edit/'+ type + id;
        router.push(path);
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
                        handler = {() => {handleAddButton(harvestList.type)}}
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
                    <h1 className='w-[1200px] h-[65px] pt-[15px] text-center text-5xl text-white'>{harvestList.title}</h1>
                    {harvestList.itens.map(e => {
                        return(
                            <Item02
                            name={harvestList.title}
                            itemId={e.id}
                            type={harvestList.type}
                            />
                        )
                    })}
                </div>
            </div>
            <div>
                <div className='flex flex-col mt-[20px] mb-[30px] h-[150px] w-[1000px]'>
                    <div className="flex mt-[30px] items-center">
                        <Button02
                        img = {add}
                        handler = {() => {handleAddButton(animalList.type)}}
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
                    <h1 className='w-[1200px] h-[65px] pt-[15px] text-center text-5xl text-white'>{animalList.title}</h1>
                    {harvestList.itens.map(e => {
                        return(
                            <Item02
                            name={animalList.title}
                            itemId={e.id}
                            type={animalList.type}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}