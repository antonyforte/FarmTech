'use client'

import Image from "next/image"
import TextInputSign from "@/app/components/textInputSign"
import Button01 from "@/app/components/button01"
import logo from "../../../public/image/food_10596175.png"
import { useState } from "react"

export default function Page() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <>
            <div className="flex flex-wrap relative h-[160px] w-[688px] mt-[33px] mb-0 justify-center">
                <h1 className="w-full h-5 mb-[65px] text-center text-7xl text-orange-500">Entrar</h1>
                <Image className='h-[60px] mb-0' src={logo} alt="" width={60} height={60}></Image>
            </div>
            <form className="flex flex-wrap pb-[50px] justify-center h-fit w-[688px]">
                <TextInputSign
                value={email}
                text="E-mail"
                placeholder="Digite seu e-mail"
                handler={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                />
                <TextInputSign
                value={password}
                text="Senha"
                placeholder="Digite sua senha"
                handler={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                />
                <Button01
                text= "Entrar"
                path= "/signIn"
                />
            </form>
        </>
    )
}