"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { MdPaid } from "react-icons/md";
import { toast } from "react-toastify";
import { apiClient } from "../../../services/api-client/apiClient";

type ValidateAccountFormData = {
    email: string;
    code: string;
};

const Validate = () => {

    const query = useSearchParams();
    const email = query.get('email');
    const router = useRouter();
    const { register, handleSubmit, getValues } = useForm<ValidateAccountFormData>({
        defaultValues: {
            email,
        }
    });

    const handleValidate = async (data: ValidateAccountFormData) => {
        try {
            const response = await apiClient.post("/auth/validate", data);
            router.push("/login")
        } catch (error) {
            toast(error?.response?.data?.message || "Algo deu errado", {
                type: "error",
                autoClose: 3000,
                closeButton: true,
            });
        }
    };

    const handleResendCode = async () => {
        try {
            const { email } = getValues();
            if (!email) {
                toast("Informe um Email", {
                    type: "error",
                    autoClose: 3000,
                    closeButton: true,
                });
                return;
            }
            await apiClient.post("/auth/send-code", {
                email,
            });
            toast("Código reenviado", {
                type: "success",
                autoClose: 3000,
                closeButton: true,
            });
        } catch (error) {
            toast(error?.response?.data?.message || "Algo deu errado", {
                type: "error",
                autoClose: 3000,
                closeButton: true,
            });
        }
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center gap-5 ">
            <div className={`flex items-center top-32 absolute`}>
                <h1 className={`text-3xl text-primary`}>NO CONTROLE</h1>
                <MdPaid className={`text-primary text-6xl md:text-7xl`} />
            </div>
            <h1 className={`text-4xl text-primary`}>Validar</h1>
            <form
                onSubmit={handleSubmit(handleValidate)}
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
                    {...register("code", {
                        required: true,
                    })}
                    className="border-x-primary border-2 p-2 w-full"
                    type="code"
                    placeholder="Código"
                />
                <div className="flex w-full gap-3 justify-between">
                    <Link href={`../login`}>Fazer Login</Link>
                    <button className="text-primary" onClick={handleResendCode}>Reenviar Código</button>
                </div>
                <button
                    type="submit"
                    className="bg-primary w-full hover:bg-secondary text-white hover:text-primary px-4 py-2 rounded-md"
                >
                    Validar Conta
                </button>
            </form>
        </div>
    );
};

export default Validate;
