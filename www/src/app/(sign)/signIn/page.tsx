'use client';

import Image from "next/image";
import TextInputSign from "@/app/components/textInputSign";
import Button01 from "@/app/components/button01";
import logo from "../../../public/image/food_10596175.png";
import { useState } from "react";

export default function Page() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevenir o reload da página
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            setMessage("Login realizado com sucesso!");
            console.log("Dados do usuário:", data);
        } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
        }
    };

    return (
        <>
            <div className="flex flex-wrap relative h-[160px] w-[688px] mt-[33px] mb-0 justify-center">
                <h1 className="w-full h-5 mb-[65px] text-center text-7xl text-orange-500">Entrar</h1>
                <Image className="h-[60px] mb-0" src={logo} alt="" width={60} height={60} />
            </div>
            <form
                className="flex flex-wrap pb-[50px] justify-center h-fit w-[688px]"
                onSubmit={handleLogin}
            >
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
                <Button01 text="Entrar" path="#" />
            </form>
            {message && <p className="text-center mt-4 text-red-500">{message}</p>}
        </>
    );
}