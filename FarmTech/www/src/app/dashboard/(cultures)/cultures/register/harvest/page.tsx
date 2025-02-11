'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import TextInputFarm01 from '@/app/components/textInputFarm01';
import NumberInputFarm01 from '@/app/components/numberInputFarm01';
import SelectInput from '@/app/components/selectInputFarm';
import Button01 from '@/app/components/button01';
import Button02 from '@/app/components/button02';
import add from "@/public/image/add.png"
import del from "@/public/image/Remove.png"


interface product {
    productName: string |'',
    productId: number | '',
}
interface info {
    product: product,
    qtd: number | ''
}
interface item {
    id: number,
    info: info
}

export default function Page() {
    const router = useRouter()
    const [count, setCount] = useState<number>(1)
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [clima, setClima] = useState('');
    const [products, setProducts] = useState<product[]>([]);
    const [productsNames, setProductsNames] = useState<string[] |''>([]);
    const [itens, setItens] = useState<item[]>([{
        id: 0,
        info: {
                product: {
                    productName: '',
                    productId: ''
                },
                qtd: 0
        },
    }]);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const climas : string[] = ["Serrado", "Canga"]

    useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        router.push("/signIn"); // Redireciona para login se não estiver autenticado
                    }
                    const response = await fetch("http://localhost:3000/products", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error(await response.text());
                    }
    
                    const data = await response.json();
                    setProducts(data.map(e => {
                        return({productName: e.nome, productId: e.id})
                    }))
                    setProductsNames(data.map(e => {
                        return(e.nome)
                    }))
                    handleProductChange(data[0].nome, 0);
                } catch (error: any) {
                    setError(error.message);
                }
            };
    
            fetchProducts();
        }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/agricultures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                nome: name,
                valor_unid: Number(price),
                neces_clima: clima,
                colhxanim: false,
                needsId:
                    itens.map(item => {{
                        console.log(Number(item.info.product.productId));
                        return({
                            productId: Number(item.info.product.productId),
                            qtd: Number(item.info.qtd)
                        })
                    }})
                }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            setMessage('Fazenda criada com sucesso!');
            router.push("/dashboard/cultures")
        } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
        }
    };

    function handleAddButton(idOp : number) {
        setItens([...itens, {
            id: idOp,
            info: {
                    product: {
                        productName: products[0].productName,
                        productId: products[0].productId
                    },
                    qtd: 0
            },
        }]);
        setCount(count + 1);
    }

    function handleDeleteButton(id : number) {
        setItens(
            itens.filter(item =>
              item.id !== id
            )
        );
    }

    function handleProductChange(name : string, index : number) {
        const aux0 : product[] = products.filter(i => i.productName == name)
        console.log(String(products[0].productName));
        console.log(aux0);
        console.log('here');
        setItens(itens.map((c, i) => {
            if (i === index) {
              return ({
                ...c,
                info: {
                    ...c.info,
                    product: {
                        productName: aux0[0].productName,
                        productId: aux0[0].productId
                    }
                }
              });
            } else {
              return c;
            }
        }));
        console.log();
        console.log(itens);
    }

    function handleQtdChange(qtd : number, index : number) {
        const aux = itens.map((c, i) => {
            if (i === index) {
              return ({
                ...c,
                info: {
                    ...c.info,
                    qtd: qtd,
                }
              });
            } else {
              return c;
            }
        });
        setItens(aux);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col min-h-[520px] w-[1000px] items-center text-3xl text-white bg-neutral-700 pt-[40px] pl-[80px] pb-[30px] mt-[80px]'>
                <h1 className='text-4xl font-bold mb-[40px]'>Nova Colheita</h1>
                <div className='flex flex-col w-[920px]'>
                    <TextInputFarm01
                    text="Colheita:"
                    value={name}
                    handler={(e : React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                    />
                    <NumberInputFarm01
                        text="Valor Unidade"
                        value={price}
                        handler={(e : React.FormEvent<HTMLInputElement>) => setPrice(e.currentTarget.valueAsNumber)}
                    />
                    <SelectInput
                        text="Condições climáticas favoráveis"
                        value={clima}
                        options={climas}
                        handler={(e : React.FormEvent<HTMLInputElement>) => setClima(e.currentTarget.value)}
                    />
                    <div className='flex flex-col'>
                        {itens.map(item => {
                            return(
                                <div className='flex flex-inline justify-center'>
                                    <SelectInput
                                        text= "Produto"
                                        value={item.info.product.productName}
                                        options={productsNames}
                                        handler={(e : React.FormEvent<HTMLInputElement>) => handleProductChange(e.currentTarget.value, item.id)}
                                    />
                                    <div className='ml-[100px] mr-[30px]'>
                                        <NumberInputFarm01
                                            text="Qtd"
                                            value={item.info.qtd}
                                            handler={(e : React.FormEvent<HTMLInputElement>) => handleQtdChange(e.currentTarget.valueAsNumber, item.id)}
                                        />
                                    </div>
                                    <button className="mb-[55px]" onClick={() => handleDeleteButton(item.id)}>
                                        <Image className="h-[40px] w-[40px]" src={del} alt=""/>
                                    </button>
                                </div>
                            )
                        })}
                        <div className='flex justify-center mt-[-25px] mb-[30px]'>
                            <Button02   
                                img = {add}
                                type= "button"
                                handler = {() => {handleAddButton(count)}}
                            />
                        </div>
                    </div>
                </div>
                <Button01 type='submit' text="Adicionar" path="localhost:3000/dashboard/cultures" />
                {message && <p>{message}</p>}
            </div>
        </form>
    );
}
