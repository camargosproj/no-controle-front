import { ReactNode } from "react";
import SideBar from "../sidebar/SideBar";

type LayoutProps = {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <SideBar /> <div> {children} </div>
        </>
    );
};

export default Layout;