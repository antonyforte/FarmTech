import React from "react";

const Layout = ({children} : {children : React.ReactNode}) => {
    return (
        <div className="flex flex-col relative w-[calc(100vw-322px)] h-[100vh]">
            <div className="flex flex-wrap h-[102px] w-[calc(100vw-322px)] bg-white text-6xl text-black font-bold justify-center items-center">
                <h1>Animais / Culturas</h1>
            </div>
            <div className="flex flex-wrap h-lvh w-[calc(100vw-322px)] bg-slate-900">
                {children}
            </div>
        </div>
    );
};

export default Layout;