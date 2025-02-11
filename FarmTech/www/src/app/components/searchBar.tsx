import search from "@/public/image/search.png"
import Image from "next/image";

export default function SearchBar(props : any) {
    return (
        <div className="flex flex-inline h-[50px] ml-[30px]">
            <button onClick={props.handler02}>
                <Image className="h-[50px] mb-0 border-[1px] rounded-l-md border-slate-900" src={search} alt="" width={50} height={50}/>
            </button>
            <input            
            value={props.value} 
            onChange={props.handler01}  
            type="text" 
            placeholder={props.placeholder}
            className="pl-[15px] h-[50px] border-[1px] rounded-r-md border-slate-900 w-[680px]"
            />
        </div>
    );
}