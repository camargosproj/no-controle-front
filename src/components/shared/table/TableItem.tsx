"use client";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import apiClientInstance from "../../../services/api-client/api";
import { parseCookie } from "../../../services/util";
import styles from "./widget.module.css";


export type TableItemProps = {
    data: {
        id: string;
        description: string;
        date: string;
        category: {
            name: string;
        };
        paymentDate?: string | null;
        receivedDate?: string | null;
        amount: number;
        link?: string;
    };
    type: 'income' | 'expense';
}


const TableItem = ({ data, type }: TableItemProps) => {
    const cookies = parseCookie();
    const apiClient = apiClientInstance(cookies);
    const router = useRouter();
    let isPaid = data?.paymentDate || data?.receivedDate;




    const handlePayment = async () => {
        try {

            let requestData = {}

            if (type === 'income') {

                requestData = {
                    receivedDate: data.receivedDate ? null : new Date(),
                }

            } else if (type === 'expense') {
                requestData = {
                    paymentDate: data.paymentDate ? null : new Date(),
                }
            }

            await apiClient.patch(`/${type}/${data.id}`, requestData);
            router.refresh();
        } catch (error) {
            toast(error?.response?.data?.message || "Algo deu errado", {
                type: "error",
                autoClose: 3000,
                closeButton: true,
            });
        }
    }

    const handleDelete = async () => {
        try {
            await apiClient.delete(`/${type}/${data.id}`);
            router.refresh();
        } catch (error) {
            toast(error?.response?.data?.message || "Algo deu errado", {
                type: "error",
                autoClose: 3000,
                closeButton: true,
            });
        }
    }


    return (

        <div className={`grid grid-cols-5 px-2 sm:px-10 py-6 rounded-md h-16 shadow-md  items-center content-center ${isPaid && 'bg-gray-100'}`}>
            <span className={styles.title}>{data.description}</span>
            <span className={styles.counter}>{data.date}</span>
            <span className={styles.title}>{data?.category.name}</span>
            <span className={styles.counter}>
                {Number(data.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </span>
            <div className={`flex items-center  sm:text-3xl cursor-pointer text-2xl`}>
                <IoCheckmarkDoneCircleOutline
                    className={` ${isPaid ? 'text-green-500' : 'text-gray-500  hover:text-green-500'}`}
                    onClick={handlePayment}
                    title={type === 'income' ? (isPaid ? 'Desmarcar recebido' : 'Marcar como recebido') : (isPaid ? 'Desmarcar pagamento' : 'Marcar como pago')}
                />
                <AiOutlineDelete
                    className={`ml-2 text-red-500 hover:text-red-700`}
                    onClick={handleDelete}
                    title={`Excluir ${type === 'income' ? 'rendimento' : 'despesa'}`}
                />
            </div>
            {/* <Link href={(data.link as string) || "#"}>
                <span className={styles.link}>Ver mais</span>
            </Link> */}
        </div>
    )
}
    ;

export default TableItem;
