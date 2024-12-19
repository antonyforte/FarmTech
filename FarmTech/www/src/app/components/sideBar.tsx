"use client"

import Image from "next/image";
import MenuButton from "./menuButton";
import menuIcon from "../../public/image/menu.png"
import farmsIcon from "../../public/image/farmIcon.png"
import productsIcon from "../../public/image/productIcon.png"
import culturesIcon from "../../public/image/cultureIcon.png"
import logoutIcon from "../../public/image/logout.png"
import { useRouter } from "next/navigation";

export default function SideBar(props : any) {
    
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');

        router.push('/');
    };

    function handleChangePage(path: string){
        router.push(path);
    }

    return (
        <div className="flex flex-col fixed top-0 h-screen w-[322px] bg-orange-500 border-[2px] border-slate-900">
            <div className="p-[14px]">
                <Image className="h-[50px] w-[50px]" src={menuIcon} alt=""/>
            </div>
            <div className="flex flex-col mt-[15px] mb-[45px] h-auto w-[322px] items-center text-4xl text-white text-stroke font-bold">
                <Image className="mb-[12px] h-[120px] w-[120px]" src={props.userIcon} alt=""/>
                <h1>{props.username}</h1>
            </div>
            <div className="flex flex-col w-[322px] h-auto items-center">
                <MenuButton
                text= "Fazendas"
                image= {farmsIcon}
                width= "w-[267px]"
                handler= {() => {handleChangePage("/dashboard")}}
                />
                <MenuButton
                text= "Produtos"
                image= {productsIcon}
                width= "w-[267px]"
                handler= {() => {handleChangePage("/dashboard/products")}}
                />
                <MenuButton
                text= "Agropecuária"
                image= {culturesIcon}
                width= "w-[267px]"
                handler= {() => {handleChangePage("/dashboard/cultures")}}
                />
            </div>
            <div className="flex flex-col h-auto w-[322px] mt-[50px] items-center">
                <MenuButton
                text= "Sair"
                image= {logoutIcon}
                width= "w-[150px]"
                handler= {handleLogout}
                />
            </div>
        </div>
    );
}