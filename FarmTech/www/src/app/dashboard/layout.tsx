import React from "react";
import SideBar from "../components/sideBar";
import userIcon from "@/public/image/user.png"

const Layout = ({children} : {children : React.ReactNode}) => {

    return (
        <div className="flex flex-line">
            <SideBar
            userIcon={userIcon}
            username="Usuário"
            />
            {children}
        </div>
    );
};

export default Layout;