export default function TextInputSign(props: any) {
    return (
        <div className="flex flex-col h-fit mt-[20px] mb-[25px] justify-self-center w-[563px]">
            <h1 className="pb-[15px] text-3xl text-orange-500">{props.text}</h1>
            <input
            value={props.value} 
            onChange={props.handler}  
            type="text" 
            placeholder={props.placeholder}
            className="ml-[5px] pl-[15px] h-[34px] border-[1px] border-slate-900 w-[563px]"
            />
        </div>
    )
}