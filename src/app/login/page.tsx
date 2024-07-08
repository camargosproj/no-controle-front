"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdPaid } from "react-icons/md";
import { toast } from "react-toastify";
import { useAuth } from "../../services/contexts/useAuth";

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      tlds: false,
    })
    .message("Email inválido"),
  password: Joi.string()
    .required()
    .min(6)
    .message("Senha deve ter no mínimo 6 caracteres"),
});

const Login = () => {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const handleLogin = (data: { email: string; password: string }) => {
    auth.login(data);
  };

  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      toast(errors[key].message as string, {
        type: "error",
        autoClose: 3000,
        closeButton: true,
      });
    });
  }, [errors]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-5 ">
      <div className={`flex items-center top-32 absolute`}>
        <h1 className={`text-3xl text-primary`}>NO CONTROLE</h1>
        <MdPaid className={`text-primary text-6xl md:text-7xl`} />
      </div>
      <h1 className={`text-4xl text-primary`}>Login</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-3 items-center w-72  md:w-80"
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
        <div className="flex w-full gap-3 justify-between">
          <Link href={`register`}>Criar conta</Link>
          <Link href={`#`}>Esqueceu a senha?</Link>
        </div>
        <button
          type="submit"
          className="bg-primary w-full hover:bg-secondary text-white hover:text-primary px-4 py-2 rounded-md"
          disabled={isSubmitting}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
