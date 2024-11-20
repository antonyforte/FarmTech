
import Image from 'next/image';
 

export default function MenuButton(props : any) {

    return (
        <button onClick={props.handler} className={"flex mt-[44px] h-[60px] text-3xl text-white font-bold bg-orange-500 activated:border-[1px] activated:border-white "+ props.width}>
            <Image className="mx-[8px] h-[34px] w-auto" src={props.image} alt=""/>
            <h1>{props.text}</h1>
        </button>
    )
}