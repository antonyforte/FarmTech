
export default function NumberInputFarm01(props : any) {
    return (
        <label>{props.text}:
            <input
            type="number"
            placeholder= {props.placeholder}
            value={props.value}
            onChange={props.handler}
            required
            className="ml-[20px] pl-[15px] h-[45px] border-[1px] text-neutral-700 ml-[25px] mb-[30px] border-slate-900 w-[70px]"
            />
        </label>
    );
}