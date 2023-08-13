import { ReactNode } from "react";
import NavBar from "../navbar/NavBar";


import { useRouter } from "next/router";

type LayoutProps = {
    children: ReactNode;
}

const excludePaths = ['/login', '/register'];

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();

    return (
        <>
            <div className={``}>
                <>
                    {router.pathname !== '/login' ? < NavBar /> : null}
                    {children}

                </>
            </div>

        </>
    );
};

export default Layout;