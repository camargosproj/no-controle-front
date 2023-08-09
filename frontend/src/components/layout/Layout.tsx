import { ReactNode } from "react";
import NavBar from "../navbar/NavBar";


import { useRouter } from "next/router";
import styles from "./layout.module.css";

type LayoutProps = {
    children: ReactNode;
}

const excludePaths = ['/login', '/register'];

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();

    return (
        <>
            <div className={styles.home}>
                <div className={styles.homeContainer}>
                    {router.pathname !== '/login' ? < NavBar /> : null}
                    {children}

                </div>
            </div>

        </>
    );
};

export default Layout;