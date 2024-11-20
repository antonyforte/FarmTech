'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/signIn"); // Redireciona para login se não estiver autenticado
        }
    }, [router]);


    return (
        <></>
    );
}