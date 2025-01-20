import Image from "next/image";
import { useRouter } from "next/navigation";
import info from "@/public/image/Info.png"
import edit from "@/public/image/Edit.png"
import del from "@/public/image/Remove.png"

export default function Product(props : any) {
    const router = useRouter();

    function handleEdit() {
        const path : string = '/dashboard/products/edit/' + props.id;
        router.push(path);
    }

    async function handleDelete() {
        console.log(props.id);
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/products/delete/'+props.id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
        props.handler();
    }

    return (
        <div className="flex flex-inline h-[170px] w-[1000px] bg-neutral-700 mb-[3px] items-center">
            <div className="w-[120px] h-[120px] bg-slate-900 ml-[30px] mr-[40px]"></div>
            <div className="flex flex-col h-[160px] w-[700px] text-white pt-[20px]">
                <div>
                    <h1 className="text-2xl font-bold">{props.name}</h1>
                </div>
                <div className="flex flex-inline mt-[40px]">
                    <h1>ID: {props.id}</h1>
                    <h1 className="ml-[400px]">Preço R${props.price.toFixed(2)}</h1>
                </div>
            </div>
            <div className="flex flex-col ml-[60px]">
                <button onClick={handleEdit}>
                    <Image className="mb-[30px] h-[40px] w-[40px]" src={edit} alt=""/>
                </button>
                <button onClick={handleDelete}>
                    <Image className="mb-[12px] h-[40px] w-[40px]" src={del} alt=""/>
                </button>
            </div>
        </div>
    );
}