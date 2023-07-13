import { ReactNode } from "react";
import NavBar from "../navbar/NavBar";
import SideBar from "../sidebar/SideBar";

import styles from "./layout.module.css"

type LayoutProps = {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <div className={styles.home}>
                {/* <SideBar /> */}
                <div className={styles.homeContainer}>
                    <NavBar />
                    {children}
                </div>
            </div>

        </>
    );
};

export default Layout;