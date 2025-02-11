import Image from "next/image";
import { useRouter } from "next/navigation";
import edit from "@/public/image/Edit.png"
import img1 from "@/public/image/Colheita.jpg"
import img2 from "@/public/image/gado.jpg"

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
        <div key={props.itemId} className="flex flex-col h-[260px] pt-[20px] w-[200px] ml-[10px] mb-[20px] items-center">
            <h1 className="text-white text-1xl mb-[10px]">{props.name}</h1>
            <div className="flex flex-col items-end w-[175px] h-[175px] border-[1px] border-neutral-400 bg-slate-900 ml-[30px] mr-[40px]">
                <button className="z-10 absolute" onClick={handleEdit}>
                    <Image className="mt-[12px] h-[40px] w-[40px]" src={edit} alt=""/>
                </button>
                <Image className="z-0 w-[175px] h-[175px]" src={(props.type === "animal") ? img2 : img1} alt=""/>
            </div>
            <div className="text-white text-1xl mt-[10px]">
                <h1>ID: {props.itemId}</h1>
            </div>
        </div>
    );
}