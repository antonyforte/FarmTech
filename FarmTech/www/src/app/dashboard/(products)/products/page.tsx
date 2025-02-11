'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button02 from "@/app/components/button02";
import Product from "../../../components/product";
import SearchBar from "../../../components/searchBar";
import add from "@/public/image/add.png"


export default function Page() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState<string | ''>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push("/signIn"); // Redireciona para login se não estiver autenticado
                }
                const response = await fetch('http://localhost:3000/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                const data = await response.json();
                setProducts(data);
                setList(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, []);

    function handleAddButton() {
        router.push("/dashboard/products/register");
    }


    function handleChangeSearch(e : string) {
        setSearch(e);
        setList(products.filter(product => product.nome.toLowerCase().includes(e.toLowerCase())));
    }

    return (
        <div className="flex flex-col pt-[40px]">
            <div className="flex flex-inline mb-[30px]">
                <Button02
                img = {add}
                handler = {() => {handleAddButton()}}
                />
                <SearchBar
                value={search} 
                handler01={(e : React.FormEvent<HTMLInputElement>) => {handleChangeSearch(String(e.currentTarget.value))}}  
                type="text" 
                placeholder="Digite o nome do item..."
                />
            </div>
            {list.map(product => {
                return(
                    <Product
                    id={product.id}
                    name={product.nome}
                    price={product.preco}
                    />
                )
            })}
        </div>
    );
}