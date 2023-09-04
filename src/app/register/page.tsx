"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MdPaid } from "react-icons/md";
import { toast } from "react-toastify";
import { apiClient } from "../../services/api-client/apiClient";

type CreateAccountFormData = {
    email: string;
    password: string;
    name: string;
};

const CreateAccount = () => {
    const router = useRouter();

    const { register, handleSubmit } = useForm();

    const handleSingUp = async (data: CreateAccountFormData) => {
        try {
            const response = await apiClient.post("/auth/singup", data);
            router.push("/register/validate")
        } catch (error) {
            toast(error?.response?.data?.message || "Algo deu errado", {
                type: "error",
                autoClose: 3000,
                closeButton: true,
            });
        }
    };


    return (
        <div className="flex flex-col w-full h-screen items-center justify-center gap-5 ">
            <div className={`flex items-center top-32 absolute`}>
                <h1 className={`text-3xl text-primary`}>NO CONTROLE</h1>
                <MdPaid className={`text-primary text-6xl md:text-7xl`} />
            </div>
            <h1 className={`text-4xl text-primary`}>Criar conta</h1>
            <form
                onSubmit={handleSubmit(handleSingUp)}
                className="flex flex-col gap-4 items-center w-72  md:w-80"
            >
                <input
                    {...register("name", {
                        required: true,
                    })}
                    className="border-x-primary border-2 p-2 w-full"
                    type="text"
                    placeholder="Nome"
                />
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
                <div className="flex w-full gap-3 justify-between">
                    <Link href={`login`}>Fazer Login</Link>
                    <Link href={`#`}>Esqueceu a senha?</Link>
                </div>
                <button
                    type="submit"
                    className="bg-primary w-full hover:bg-secondary text-white hover:text-primary px-4 py-2 rounded-md"
                >
                    Criar
                </button>
            </form>
        </div>
    );
};

export default CreateAccount;
