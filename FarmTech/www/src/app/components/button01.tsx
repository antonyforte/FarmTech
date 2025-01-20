export default function Button01(props : any) {
    return (
        <button onClick={props.handler} type={props.type} className="flex justify-center items-center h-[62px] w-[153px] text-3xl text-white bg-orange-500 border-[1px] border-slate-900">
            <h1>{props.text}</h1>
        </button>
    )
}