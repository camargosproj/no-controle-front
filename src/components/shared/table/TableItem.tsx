import Link from "next/link";
import styles from "./widget.module.css";

const TableItem = ({ data }: any) => {


    return (
        <div className="grid grid-cols-5 px-2 sm:px-10 py-6 rounded-md h-16 shadow-md  items-center content-center">
            <span className={styles.title}>{data.description}</span>
            <span className={styles.counter}>{data.date}</span>
            <span className={styles.title}>{data?.category.name}</span>
            <span className={styles.counter}>
                {Number(data.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </span>
            <Link href={(data.link as string) || "#"}>
                <span className={styles.link}>Ver mais</span>
            </Link>
        </div>
    )
}
    ;

export default TableItem;
