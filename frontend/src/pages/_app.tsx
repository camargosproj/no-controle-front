import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../components/layout/Layout";
import { AuthContext, useAuthProvider } from "../services/contexts/useAuth";

export default function App({ Component, pageProps }: AppProps) {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>

      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AuthContext.Provider>

  );
}
