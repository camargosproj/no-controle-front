"use client";
import { PaidSharp } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../services/contexts/useAuth";

const Login = () => {
    const auth = useAuth();

    const { register, handleSubmit } = useForm();

    const handleLogin = (data: { email: string; password: string }) => {
        auth.login(data);
    };

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center gap-5 ">
            <div className={`flex items-center top-32 absolute`}>
                <h1 className={`text-3xl text-primary`}>NO CONTROLE</h1>
                <PaidSharp className={`text-primary text-6xl md:text-7xl`} />
            </div>
            <h1 className={`text-4xl text-primary`}>Login</h1>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col gap-4 items-center w-72  md:w-80"
            >
                <input
                    {...register("email", {
                        required: true,
                    })}
                    className="border-x-primary border-2 p-2 w-full"
                    type="text"
                    placeholder="Email"
                />
                <input
                    {...register("password", {
                        required: true,
                    })}
                    className="border-x-primary border-2 p-2 w-full"
                    type="password"
                    placeholder="senha"
                />
                <button
                    type="submit"
                    className="bg-primary hover:bg-secondary text-white hover:text-primary px-4 py-2 rounded-md"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
