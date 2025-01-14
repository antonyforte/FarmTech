'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button02 from "@/app/components/button02";
import Product from "../../../components/product";
import add from "@/public/image/Add.png"


export default function Page() {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    function handleAddButton() {
        router.push("/dashboard/product/register");
    }


    return (
        <div className="flex flex-col ml-[104px] pt-[40px]">
            <Button02
            img = {add}
            handler = {() => {handleAddButton()}}
            />
            {products.map(product => {
                return(
                    <Product
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    />
                )
            })}
        </div>
    );
}