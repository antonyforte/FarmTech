export default function SelectInput(props : any) {
    return(
        <label className="mb-[30px] ml-[60px]">{props.text}:
            <select value= {props.value} onChange={props.handler} className="ml-[5px] pl-[15px] h-[34px] border-[1px] ml-[25px] mb-[30px] border-slate-900 w-[150px]">
                {props.options.map((e) => (
                    <option value={e}>{e}</option>
                ))}
            </select>
        </label>
    );
}