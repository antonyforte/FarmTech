

export default function TextInputFarm01(props : any) {
    return (
        <label className="mr-[30px] mb-[25px]">{props.text}
            <input
            type="text"
            placeholder= "Digite aqui..."
            value={props.value}
            onChange={props.handler}
            required
            className="ml-[20px] pl-[15px] h-[45px] text-2xl text-neutral-700 border-[1px] ml-[25px] mb-[30px] border-slate-900 w-[563px]"
            />
        </label>
    );
}