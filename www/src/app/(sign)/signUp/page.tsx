'use client'

import Image from "next/image"
import TextInputSign from "@/app/components/textInputSign"
import Button01 from "@/app/components/button01"
import logo from "../../../public/image/food_10596175.png"
import { useState } from "react"
import React from "react"

export default function Page() {
    const [username, setUsername] = useState<string>("");
    const [cpf, setCPF] = useState<string>('');
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <>
            <div className="flex flex-wrap relative h-[130px] w-[688px] mt-[30px] mb-0 justify-center">
                <h1 className="w-full h-5 mb-[60px] text-center text-6xl text-orange-500">Registro</h1>
                <Image className='h-[60px] mb-0' src={logo} alt="" width={60} height={60}></Image>
            </div>
            <form className="flex flex-wrap pb-[45px] justify-center h-fit w-[688px]">
                <TextInputSign
                value={username}
                text="Nome"
                placeholder="Digite seu nome"
                handler={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
                />
                <TextInputSign
                value={cpf}
                text="CPF"
                placeholder="Digite seu cpf(apenas números)"
                handler={(e: React.FormEvent<HTMLInputElement>) => setCPF(e.currentTarget.value)}
                />
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