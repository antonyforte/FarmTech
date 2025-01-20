'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button02 from "@/app/components/button02";
import Product from "../../../components/product";
import add from "@/public/image/Add.png"


export default function Page() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
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
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, []);

    function handleAddButton() {
        router.push("/dashboard/products/register");
    }

    function handleDeleteButton(id : number) {
        setProducts(
            products.filter(item =>
            item.id !== id
            )
        );
    }


    return (
        <div className="flex flex-col pt-[40px]">
            <div className="mb-[30px]">
                <Button02
                img = {add}
                handler = {() => {handleAddButton()}}
                />
            </div>
            {products.map(product => {
                return(
                    <Product
                    id={product.id}
                    name={product.nome}
                    handler={() => handleDeleteButton(product.id)}
                    price={product.preco}
                    />
                )
            })}
        </div>
    );
}