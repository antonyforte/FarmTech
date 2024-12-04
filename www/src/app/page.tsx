"use client"

import Image from "next/image";
import Button01 from "./components/button01";
import logo from "../public/image/food_10596175.png";
import mark from "../public/image/Group.png";
import { useRouter } from "next/navigation";

export default function Page() {
  
  const router = useRouter();

  function handleChangePage(path: string){
      router.push(path);
  }

  return (
   <div className="flex-wrap bg-landscape-sunset-clear-day w-screen h-screen">
      <div className="max-w-full h-[145px] flex flex-wrap items-center justify-between mx-auto border-b-[2px] border-slate-900" >
        <div className="flex flex-wrap justify-center items-center pl-6 justify-self-start">
          <Image className="" src={logo} alt="" width={90} height={90}></Image>
          <h1 className="text-5xl pl-4 text-white text-stroke font-bold">FarmTech</h1>
        </div>
        <div className="flex flex-wrap relative justify-between text-3xl text-white text-stroke font-bold w-[400px] justify-self-center">
          <h1 className="hover:border-b-[2px] hover:border-orange-500">Home</h1>
          <h1 className="hover:border-b-[2px] hover:border-orange-500">Contato</h1>
          <h1 className="hover:border-b-[2px] hover:border-orange-500">UFSJ</h1>
        </div>
        <div className="flex flex-wrap mr-[30px] relative justify-between w-[345px] justify-self-end">
          <Button01
          text= "Entrar"
          handler= {() => {handleChangePage("/signIn")}}
          />
          <Button01
          text= "Registrar"
          handler= {() => {handleChangePage("/signUp")}}

          />
        </div>
      </div>
      <div className="flex flex-col h-[calc(100vh-145px)] max-w-full mx-auto">
        <div className="flex flex-col h-[calc(78vh-145px)] max-w-full relative justify-center items-center">
          <h1 className="text-9xl pb-[35px] text-orange-500 text-stroke font-bold">FARMTECH</h1>
          <span className="text-4xl text-orange-500 text-stroke font-bold">Um sistema para Gerenciamento de Grandes Fazendas</span>
        </div>
        <div className="flex flex-col relative pl-[35px] justify-end text-3xl text-white text-stroke">
          <div className="flex flex-wrap mb-[30px]">
            <Image className="mr-[15px]" src={mark} alt="" width={36} height={35}></Image>
            <h1>Calcule as Necessidades da sua Fazenda</h1>
          </div>
          <div className="flex flex-wrap">
            <Image className="mr-[15px]" src={mark} alt="" width={36} height={35}></Image>
            <h1>Analise as Principais Culturas da sua Fazenda </h1>
          </div>
        </div>
      </div>
   </div>
  );
}
