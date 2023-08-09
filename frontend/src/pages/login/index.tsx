import { useForm } from "react-hook-form";
import { useAuth } from "../../services/contexts/useAuth";

const Login = () => {
    const auth = useAuth();

    const { register, handleSubmit } = useForm();

    const handleLogin = (data: { email: string; password: string }) => {
        auth.login(data);
    };

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4 items-center ">
                <input
                    {...register("email", {
                        required: true,
                    })}
                    className="border-x-cyan-800 border-2"
                    type="text"
                    placeholder="Pesquisar"
                />
                <input
                    {...register("password", {
                        required: true,
                    })}
                    className="border-x-cyan-800 border-2"
                    type="password"
                    placeholder="Pesquisar"
                />
                <button type="submit" className="bg-sky-500/100 px-4 py-2 rounded-md">
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
