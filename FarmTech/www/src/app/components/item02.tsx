import Image from "next/image";
import { useRouter } from "next/navigation";
import info from "@/public/image/Info.png"
import edit from "@/public/image/Edit.png"
import del from "@/public/image/Remove.png"

export default function Item02(props : any) {
    const router = useRouter();


    function handleInfo() {
        const path = "/dashboard/cultures/"+ props.type+"/"+props.id;
        router.push(path);
    }

    function handleEdit() {
        console.log(props.itemId);
        const path : string = "/dashboard/cultures/edit/"+ props.type+ "/" +props.itemId;
        router.push(path);
    }

    async function handleDelete() {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/agricultures/delete/'+props.itemId, {
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
        <div className="flex flex-col h-[220px] pt-[20px] w-[200px] ml-[10px] mb-[20px] items-center">
            <div className="flex flex-col justify-center items-end pr-[5px] w-[175px] h-[180px] border-[1px] border-neutral-400 bg-slate-900 ml-[30px] mr-[40px]">
                <button onClick={handleInfo}>
                    <Image className="mb-[12px] h-[40px] w-[40px]" src={info} alt=""/>
                </button>
                <button onClick={handleEdit}>
                    <Image className="mb-[12px] h-[40px] w-[40px]" src={edit} alt=""/>
                </button>
                <button onClick={handleDelete}>
                    <Image className="h-[40px] w-[40px]" src={del} alt=""/>
                </button>
            </div>
            <div className="text-white text-1xl mt-[10px]">
                <h1>{props.name}</h1>
            </div>
        </div>
    );
}