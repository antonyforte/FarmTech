'use client';

const add = "/image/Add.png"
const opt = "/public/image/m0.png"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button02 from "@/app/components/button02";
import SearchBar from "@/app/components/searchBar";
import Farm from "@/app/components/farm";

export default function Page() {
    const router = useRouter();
    const [searchedFarm, setSearcheFarm] = useState<string>("");
    const [farms, setFarms] = useState([]);
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
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchFarms();
    }, []);


    function handleAddButton() {
        router.push("/dashboard/register");
    }

    function handleOptButton() {
        return;
    }

    function handleSearch(searched_farm : string) {
        setSearcheFarm(searched_farm);
    }


    return (
        <div className="flex flex-col ml-[104px] mt-[50px]">
            <div className="flex h-[70px] w-[1000px] mb-[30px] items-center">
                <Button02
                img = {add}
                handler = {() => {handleAddButton()}}
                />
                <Button02
                img = {opt}
                handler = {() => {handleOptButton()}}
                />
                <SearchBar
                value={searchedFarm} 
                handler={(e : React.FormEvent<HTMLInputElement>) => {handleSearch(e.currentTarget.value)}}  
                type="text" 
                placeholder="Digite o nome da fazenda..."
                />
            </div>
            <div className="flex mt-[50px]">
                <Farm
                id= "4"
                name= "po"
                owner= "tt"
                size= "4"
                local= "Rua algusta"
                />
            </div>
        </div>
    );
}