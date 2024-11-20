import React from "react";

const ContasLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div className="flex-wrap bg-background01 w-screen h-screen content-center">
            <div className="flex flex-wrap m-auto h-fit w-[688px] border-[1px] border-black bg-orange-50 bg-opacity-80">
                {children}
            </div>
        </div>
    );
};

export default ContasLayout;