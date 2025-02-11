export default function SelectInput(props : any) {
    return(
        <label className="mb-[30px] ml-[10px]">{props.text}:
            <select value= {props.value} onChange={props.handler} className="ml-[20px] pl-[15px]  pb-[5px] h-[45px] text-neutral-700 border-[1px] ml-[25px] mb-[30px] border-slate-900 w-[150px]">
                {props.options.map((e) => (
                    <option key={e} value={e}>{e}</option>
                ))}
            </select>
        </label>
    );
}