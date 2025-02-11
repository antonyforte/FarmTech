import Image from "next/image";
import { useRouter } from "next/navigation";
import edit from "@/public/image/Edit.png"
import del from "@/public/image/Remove.png"
import img1 from "@/public/image/cultura.jpg"

export default function Item01(props : any) {
    const router = useRouter();


    function handleInfo() {
        const path = "/dashboard/"+ props.type+"/"+props.itemId;
        router.push(path);
    }

    function handleEdit() {
        const path : string = "/dashboard/"+ props.farmId +"/"+props.type+"_edit/"+props.itemId;
        router.push(path);
    }

    async function handleDelete() {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/cultures/farms/'+props.farmId+'/cultures/'+props.itemId, {
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
        <div key={props.itemId} className="flex flex-col h-[220px] pt-[20px] w-[200px] ml-[10px] mb-[20px] items-center">
            <div className="flex flex-col items-end  w-[175px] h-[175px] border-[1px] border-neutral-400 bg-slate-900 ml-[30px] mr-[40px]">
                <button className="z-10 absolute mt-[8px] mr-[5px]" onClick={handleEdit}>
                    <Image className="mb-[20px] h-[40px] w-[40px]" src={edit} alt=""/>
                </button>
                <button className="z-10 absolute mt-[80px] mr-[5px]" onClick={handleDelete}>
                    <Image className="h-[40px] w-[40px]" src={del} alt=""/>
                </button>
                <Image className="z-0 w-[175px] h-[175px]" src={img1} alt=""/>
            </div>
            <div className="text-white text-1xl mt-[10px]">
                <h1>{props.name+ ' ' + props.itemId}</h1>
            </div>
        </div>
    );
}