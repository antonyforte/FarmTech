

export default function TextInputFarm01(props : any) {
    return (
        <label className="mr-[20px]">{props.text}
            <input
            type="text"
            placeholder= "Digite aqui..."
            value={props.value}
            onChange={props.handler}
            required
            className="ml-[5px] pl-[15px] h-[34px] text-2xl border-[1px] ml-[25px] mb-[30px] border-slate-900 w-[563px]"
            />
        </label>
    );
}