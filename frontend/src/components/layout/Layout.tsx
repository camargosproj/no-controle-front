"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext, useAuthProvider } from "../../services/contexts/useAuth";
import NavBar from "../navbar/NavBar";

type LayoutProps = {
    children: ReactNode;
};

const excludePaths = ["/login", "/register"];

const Layout = ({ children }: LayoutProps) => {
    const pathname = usePathname();
    const auth = useAuthProvider();

    return (
        <>
            <AuthContext.Provider value={auth}>
                <div className={`h-screen`}>
                    <>
                        {!excludePaths.includes(pathname) ? <NavBar /> : null}
                        {children}
                    </>
                </div>
                <ToastContainer />
            </AuthContext.Provider>
        </>
    );
};

export default Layout;
