import Image from "next/image";
import { useRouter } from "next/navigation";
import info from "@/public/image/Info.png"
import edit from "@/public/image/Edit.png"
import del from "@/public/image/Remove.png"

export default function Farm(props : any) {
    const router = useRouter();


    function handleInfo() {
        const path = '/dashboard/' + props.id;
        router.push(path);
    }

    function handleEdit() {
        const path = '/dashboard/edit/' + props.id;
        router.push(path);
    }

    function handleDelete() {

    }

    return (
        <div className="flex flex-inline h-[200px] w-[1000px] bg-neutral-700 mb-[80px] items-center">
            <div className="w-[250px] h-[150px] bg-slate-900 ml-[30px] mr-[40px]"></div>
            <div className="flex flex-col h-[160px] w-[500px] text-white pt-[5px]">
                <div>
                    <h1 className="text-4xl font-bold">{props.name}</h1>
                </div>
                <div className="flex flex-col mt-[30px]">
                    <div className="flex flex-inline mb-[25px]">
                        <h1>{props.owner}</h1>
                        <h1 className="ml-[40px] ml-[100px]">{props.size} hectares</h1>
                    </div>
                    <h1>{props.local}</h1>
                </div>
            </div>
            <div className="flex flex-col ml-[60px]">
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
        </div>
    );
}