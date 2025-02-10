'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import add from "@/public/image/add.png"
import opt from "@/public/image/m0.png"
import Button02 from '../../../components/button02';
import SearchBar from '../../../components/searchBar';
import Item01 from '../../../components/item01';

interface List {
    type: string;
    title: string;
    itens: any[];
}

interface farm {
    size : number,
    address : string,
    owner : string,
}

export default function Page({ params }: { params: { id: number } }) {

    const router = useRouter();
    const aux = use(params);
    const [id, setId] = useState<number>(aux.id);
    const [search, setSearch] = useState<string>("");
    const [cultures, setCultures] = useState<any[]>([]);
    const [farm, setFarm] = useState<farm>({
        size: 0,
        owner: '',
        address: '',
    });
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
                const response = await fetch("http://localhost:3000/farms/"+id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                const data = await response.json();
                setFarm({
                    size: data.tamanho,
                    owner: data.proprietar,
                    address: data.endereco
                });
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
                const response = await fetch('http://localhost:3000/cultures/farms/'+id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                const data = await response.json();
                setList({...list, itens: data});
                setCultures(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchFarm();
        fetchCultures();
    }, []);

    if (error) {
        return <p className="text-red-500">Erro: {error}</p>;
    }

    console.log(farm);

    function handleAddButton(type : string) {
        router.push("/dashboard/"+ id+ "/" + type+"_register");
    }

    function handleBack() {
        router.back();
    }

    function handleEdit() {
        const path : string = '/dashboard/edit/' + id;
        router.push(path);
    }

    function handleDeleteButton(id : number) {
        setList({
            ...list,
            itens: list.itens.filter(item =>
              item.id !== id
            )
        });
    }

    function handleSearch(e : string) {
        setSearch(e);
        setList({...list, itens: cultures.filter(culture => (culture.local.toLowerCase().includes(e.toLowerCase()) || culture.agriculture.nome.toLowerCase().includes(e.toLowerCase())))});
    }

    function handleNeeded() {
        const path : string = '/dashboard/' + id + '/ranking';
        router.push(path);
    }

    return (
        <div className='flex flex-col w-screen items-center'>
            <div className='flex flex-col w-[81vw] h-[25vh] bg-neutral-700 text-white items-center'>
                <div className='flex flex-inline pt-[20px] pl-[20px] pr-[30px] w-[81vw] justify-between'>
                    <button onClick= {() => handleBack()} className='h-[50px] pl-[20px] pr-[20px] bg-blue-400 border-[1px] border-slate-700 rounded-md text-[18px]'>Voltar</button>
                    <div className='flex'>
                        <button onClick={() => handleEdit()} className='h-[50px] pl-[20px] pr-[20px] bg-yellow-400 border-[1px] border-slate-700 rounded-md text-[18px]'>Editar Fazenda</button>
                        <button className='h-[50px] pl-[20px] pr-[20px] ml-[20px] bg-red-400 border-[1px] border-slate-700 rounded-md text-[18px]'>Deletar Fazenda</button>
                    </div>
                </div>
                <h1 className='text-5xl font-bold'>Fazenda</h1>
                <div className="flex flex-inline w-[81vw] justify-between pl-[30px] pr-[30px] mt-[40px] mb-[25px]">
                    <h1>ID: {id}</h1>
                    <h1 className="ml-[150px]">Proprietário: {farm.owner}</h1>
                    <h1 className="ml-[150px]">Tamanho: {farm.size} hectares</h1>
                    <h1 className="ml-[150px]">Endereço: {farm.address}</h1>
                </div>
            </div>
            <div className='flex flex-col mt-[20px] mb-[20px] h-[150px] w-[1000px]'>
                <div className="flex mt-[30px] items-center">
                    <Button02
                    img = {add}
                    handler = {() => {handleAddButton(list.type)}}
                    />
                    <SearchBar
                    value={search} 
                    handler01={(e : React.FormEvent<HTMLInputElement>) => {handleSearch(String(e.currentTarget.value))}}  
                    type="text" 
                    placeholder="Digite o nome do item..."
                    />
                    <button onClick={() => handleNeeded()} className='h-[50px] pl-[20px] ml-[20px] pr-[20px] bg-yellow-400 border-[1px] border-slate-700 rounded-md text-[15px]'>Calcular Necessidades</button>
                </div>
            </div>
            <div className='flex flex-wrap w-[1200px] bg-neutral-700'>
                <h1 className='w-[1200px] h-[65px] pt-[15px] text-center text-5xl text-white'>{list.title}</h1>
                {list.itens.map(e => {
                    return(
                        <Item01
                        name={list.title}
                        itemId={e.id}
                        farmId={id}
                        handler={() => handleDeleteButton(e.id)}
                        type={list.type}
                        colhxanim={e.agriculture.colhxanim}
                        />
                    )
                })}
            </div>
        </div>
    );
}
