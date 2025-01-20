import Image from "next/image"

export default function Button02(props : any) {
    return (
        <button onClick={props.handler} type={props.type} className="flex h-[50px] w-[70px] mr-[15px]">
            <Image  className="h-[50px] mb-0 ml-0" src={props.img} alt="" width={70} height={50}/>
        </button>
    )
}