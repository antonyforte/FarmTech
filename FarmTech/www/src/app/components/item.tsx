import Image from "next/image";
import { useRouter } from "next/navigation";
import info from "@/public/image/Info.png"
import edit from "@/public/image/Edit.png"
import del from "@/public/image/Remove.png"

export default function Farm(props : any) {
    const router = useRouter();


    function handleInfo() {
        const path = "/dashboard/"+ props.farmId +"/"+ props.type+"/"+props.itemId;
        router.push(path);
    }

    function handleEdit() {
        const path : string = "/dashboard/"+ props.farmId +"/"+ props.type+"_edit/"+props.itemId;
        router.push(path);
    }

    function handleDelete() {

    }

    return (
        <div className="flex flex-inline h-[200px] w-[1000px] bg-neutral-700 mb-[80px] items-center">
            <div className="flex flex-col ml-[60px] w-[250px] h-[150px] bg-slate-900 ml-[30px] mr-[40px]">
                <button onClick={handleInfo}>
                    <Image className="mb-[12px] h-[40px] w-[40px]" src={info} alt=""/>
                </button>
                <button onClick={handleEdit}>
                    <Image className="mb-[12px] h-[40px] w-[40px]" src={edit} alt=""/>
                </button>
                <button onClick={handleDelete}>
                    <Image className="mb-[12px] h-[40px] w-[40px]" src={del} alt=""/>
                </button>
            </div>
            <div className="text-white text-4xl font-bold">
                <h1>{props.name}</h1>
            </div>
        </div>
    );
}